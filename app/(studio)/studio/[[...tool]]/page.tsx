import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "../../../../sanity/env";

export { metadata, viewport } from "next-sanity/studio";

// The Studio is a client app; the route itself never changes.
export const dynamic = "force-static";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "3rem" }}>
        <h1>Sanity isn’t connected yet</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code>) and restart the server. See
          the README.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
