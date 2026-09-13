import { loadEnvConfig } from "@next/env";
import { defineCliConfig } from "sanity/cli";

// The CLI doesn't read Next's `.env*` files on its own; this loads them the
// same way `next dev` does, so both share one set of variables.
loadEnvConfig(process.cwd());

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
