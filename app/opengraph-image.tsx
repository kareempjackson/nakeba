import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_ROLE } from "./site";

export const alt = `${SITE_NAME} — ${SITE_ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const typeface = (file: string) =>
  readFile(join(process.cwd(), "public", "fonts", file));

/**
 * The share card: the signature set large on the ink ground, closed with the
 * brand gradient — the same composition logic as the page footer.
 */
export default async function OpenGraphImage() {
  const [bold, regular] = await Promise.all([
    typeface("HostGrotesk-Bold.ttf"),
    typeface("HostGrotesk-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "Host Grotesk",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#a8a7a3",
          }}
        >
          [ Operations Partnership ]
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 900,
              fontSize: 36,
              fontWeight: 400,
              lineHeight: 1.35,
              color: "#a8a7a3",
            }}
          >
            {SITE_ROLE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 14,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, #8fddf3 0%, #afc6f8 38%, #f7b4c4 72%, #ffd4b3 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Host Grotesk", data: bold, weight: 700, style: "normal" },
        { name: "Host Grotesk", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
