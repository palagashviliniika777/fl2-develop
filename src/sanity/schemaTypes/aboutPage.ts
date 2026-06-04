import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero slider", default: true },
    { name: "info", title: "Info section" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero slider",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "images",
          title: "Slider images",
          type: "array",
          validation: (rule) => rule.required().min(1),
          of: [
            defineArrayMember({
              type: "image",
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "info",
      title: "Info section",
      type: "object",
      group: "info",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "localizedString",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "localizedString",
        }),
        defineField({
          name: "body",
          title: "Body text",
          type: "localizedText",
        }),
        defineField({
          name: "principlesHeading",
          title: "Principles heading",
          type: "localizedString",
        }),
        defineField({
          name: "principles",
          title: "Principles",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "principle",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "localizedString",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "localizedText",
                }),
              ],
              preview: {
                select: { title: "title.en", subtitle: "title.ka" },
                prepare({ title, subtitle }) {
                  return { title: title || "Principle", subtitle };
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});
