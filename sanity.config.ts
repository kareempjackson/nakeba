"use client";

/**
 * The Studio, embedded at /studio. `"use client"` is required: the config is
 * full of functions, and this lets the server-rendered route hand it to
 * `NextStudio` as a client reference.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import {
  defineDocuments,
  defineLocations,
  presentationTool,
} from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, SINGLETONS } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const singletonTypes = new Set<string>(Object.keys(SINGLETONS));

/** A singleton can be published or reverted — never created, copied or deleted. */
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Nakeba Mason",
  basePath: "/studio",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },

  plugins: [
    structureTool({ structure }),
    // Live preview of unpublished edits, rendered by the site itself.
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          { route: "/", filter: `_type == "homePage" && _id == "homePage"` },
        ]),
        locations: {
          homePage: defineLocations({
            message: "The home page",
            locations: [{ title: "Home", href: "/" }],
          }),
          siteSettings: defineLocations({
            message: "Used across the whole site",
            locations: [{ title: "Home", href: "/" }],
          }),
        },
      },
    }),
    // GROQ playground, for checking what a query returns.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
