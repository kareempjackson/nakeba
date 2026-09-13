import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { CONTENT_TAG } from "../../../sanity/lib/client";

/**
 * Called by a Sanity webhook on every publish, so an edit is live on the next
 * page view rather than when the fallback revalidation window runs out.
 *
 * Expired outright rather than marked stale: an editor who publishes and
 * reloads should see their change, not the version before it.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new Response("SANITY_REVALIDATE_SECRET is not set", { status: 500 });
  }

  // `true` waits out Content Lake's eventual consistency, so the re-render
  // this triggers can't read the document from before the publish.
  const { isValidSignature, body } = await parseBody<{ _type?: string }>(
    request,
    secret,
    true,
  );

  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 });
  }
  if (!body?._type) {
    return new Response("Missing document type", { status: 400 });
  }

  revalidateTag(CONTENT_TAG, { expire: 0 });
  return NextResponse.json({ revalidated: CONTENT_TAG, type: body._type });
}
