import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Landing page")
        .id("landingPage")
        .child(
          S.document().schemaType("landingPage").documentId("landingPage"),
        ),
      S.listItem()
        .title("About page")
        .id("aboutPage")
        .child(
          S.document().schemaType("aboutPage").documentId("aboutPage"),
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
    ]);
