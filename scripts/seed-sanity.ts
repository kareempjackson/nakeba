/**
 * Writes the site's current copy and photos into Sanity, so the Studio opens
 * on what's live rather than on empty forms.
 *
 *   npx sanity exec scripts/seed-sanity.ts --with-user-token
 *
 * Runs as the logged-in CLI user, who needs write access to the project.
 * Refuses to overwrite documents that already exist — pass `-- --replace` to
 * reset them to the defaults, discarding any edits made in the Studio.
 */
import { createReadStream } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import { DEFAULT_CONTENT } from "../sanity/content/defaults";

/* An Editor token in `.env.local` works too, for when the CLI login isn't a
   member of the project: `npx sanity exec scripts/seed-sanity.ts`. */
const writeToken = process.env.SANITY_API_WRITE_TOKEN;
const client = getCliClient({
  apiVersion: "2026-09-01",
  ...(writeToken && { token: writeToken }),
});
const replace = process.argv.includes("--replace");

/** One upload per file, however many fields reuse it. */
const uploads = new Map<string, Promise<string>>();

function upload(publicPath: string) {
  let pending = uploads.get(publicPath);
  if (!pending) {
    const file = path.join(process.cwd(), "public", decodeURI(publicPath));
    pending = client.assets
      .upload("image", createReadStream(file), {
        filename: path.basename(file),
      })
      .then((asset) => {
        console.log(`  uploaded ${publicPath}`);
        return asset._id;
      });
    uploads.set(publicPath, pending);
  }
  return pending;
}

const isLocalImage = (value: unknown): value is { src: string; alt: string } =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as { src?: unknown }).src === "string" &&
  (value as { src: string }).src.startsWith("/");

const imageRef = async (src: string) => ({
  asset: { _type: "reference", _ref: await upload(src) },
});

/** Default content → Sanity document values: images uploaded, keys added. */
async function toSanity(value: unknown): Promise<unknown> {
  if (isLocalImage(value)) {
    return { _type: "accessibleImage", ...(await imageRef(value.src)), alt: value.alt };
  }
  if (Array.isArray(value)) {
    return Promise.all(
      value.map(async (item, i) => {
        const converted = await toSanity(item);
        return typeof converted === "object" && converted !== null
          ? { _key: `item${i}`, ...converted }
          : converted;
      }),
    );
  }
  if (typeof value === "object" && value !== null) {
    const entries = await Promise.all(
      Object.entries(value)
        // Deck crops are a code-side default, not something to store.
        .filter(([key]) => key !== "position")
        .map(async ([key, child]) => [key, await toSanity(child)] as const),
    );
    return Object.fromEntries(entries);
  }
  return value;
}

async function main() {
  const existing = await client.fetch<string[]>(
    `*[_id in ["siteSettings", "homePage"]]._id`,
  );
  if (existing.length && !replace) {
    console.error(
      `Already seeded (${existing.join(", ")}). Re-run with "-- --replace" to overwrite them.`,
    );
    process.exit(1);
  }

  console.log("Uploading images…");
  const { shareImage, ...settings } = DEFAULT_CONTENT.settings;
  const [settingsDoc, homeDoc, shareImageDoc] = await Promise.all([
    toSanity(settings),
    toSanity(DEFAULT_CONTENT.home),
    imageRef(shareImage),
  ]);

  console.log("Writing documents…");
  await client
    .transaction()
    .createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      ...(settingsDoc as object),
      shareImage: { _type: "image", ...shareImageDoc },
    })
    .createOrReplace({
      _id: "homePage",
      _type: "homePage",
      ...(homeDoc as object),
    })
    .commit();

  console.log("Done. Open /studio to edit.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
