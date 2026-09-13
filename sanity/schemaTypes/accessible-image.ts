import { defineField, defineType } from "sanity";

/** An image with a hotspot and alt text — every photo on the site is one. */
export const accessibleImage = defineType({
  name: "accessibleImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "What the photo shows, for screen readers and search. Leave empty only for purely decorative photos, such as the back cards of the hero deck.",
    }),
  ],
});
