import type { StructureResolver } from "sanity/structure";
import { SINGLETONS } from "./schemaTypes";

/** Two fixed documents, opened directly — no lists to pick from. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home page")
        .id(SINGLETONS.homePage)
        .schemaType("homePage")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId(SINGLETONS.homePage)
            .title("Home page"),
        ),
      S.listItem()
        .title("Site settings")
        .id(SINGLETONS.siteSettings)
        .schemaType("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SINGLETONS.siteSettings)
            .title("Site settings"),
        ),
    ]);
