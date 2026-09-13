import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

/** Leaves preview and returns to the published page. */
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
