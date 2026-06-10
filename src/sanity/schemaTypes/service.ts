import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "Shown on the landing services section card.",
      type: "localizedText",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      description: "Used on the landing services section and calculator.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pricePerSqm",
      title: "Price per m²",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "thicknessOptions",
      title: "Thickness options",
      description:
        "Optional. If added, a thickness selector appears in the calculator. Each option has a label and an additional price.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "thicknessOption",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              description: "Thickness range shown on the card, e.g. 1-3mm.",
              type: "localizedString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              description: "Optional subtitle shown below the label, e.g. Standard.",
              type: "localizedString",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "number",
              validation: (rule) => rule.required().min(0),
            }),
          ],
          preview: {
            select: { title: "label.en", subtitle: "price" },
            prepare({ title, subtitle }) {
              return {
                title: title || "Option",
                subtitle: subtitle != null ? `${subtitle}` : undefined,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "descriptionBlocks",
      title: "Description blocks",
      description:
        "Each block is a text section. Add images to display them side by side with the text.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "descriptionBlock",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "localizedText",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "images",
              title: "Images",
              description:
                "Optional. If provided, images appear side by side with the text.",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "text.en" },
            prepare({ title }) {
              const preview =
                typeof title === "string" ? title.slice(0, 60) : "Block";
              return { title: preview };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "name.ka",
      media: "featuredImage",
    },
    prepare({ title, subtitle, media }) {
      return { title: title || "Service", subtitle, media };
    },
  },
  orderings: [
    {
      title: "Name (EN)",
      name: "nameAsc",
      by: [{ field: "name.en", direction: "asc" }],
    },
  ],
});
