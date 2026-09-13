import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "../../../../sanity/lib/client";

/**
 * Opened by the Studio's Presentation tool. It validates a short-lived secret
 * the Studio mints, then turns on Draft Mode so the preview reads drafts.
 */
const token = process.env.SANITY_API_READ_TOKEN;

const handler =
  client && token
    ? defineEnableDraftMode({ client: client.withConfig({ token }) })
    : null;

export function GET(request: Request) {
  if (!handler) {
    return new Response(
      "Preview needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_READ_TOKEN.",
      { status: 501 },
    );
  }
  return handler.GET(request);
}
