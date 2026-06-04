import { defineArrayMember, defineField, defineType } from "sanity";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "services", title: "Services section" },
    { name: "about", title: "About section" },
    { name: "faq", title: "FAQ section" },
    { name: "testimonials", title: "Testimonials section" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "image",
          title: "Background image",
          type: "image",
          options: { hotspot: true },
        }),
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
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services section",
      type: "object",
      group: "services",
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
        defineField({
          name: "cta",
          title: "CTA button",
          type: "localizedString",
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About section",
      type: "object",
      group: "about",
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
        defineField({
          name: "cta",
          title: "CTA button",
          type: "localizedString",
        }),
        defineField({
          name: "images",
          title: "Slider images",
          type: "array",
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
      name: "faq",
      title: "FAQ section",
      type: "object",
      group: "faq",
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
        defineField({
          name: "items",
          title: "FAQ items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "faqItem",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "localizedString",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "localizedText",
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: { title: "question.en", subtitle: "question.ka" },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "FAQ item",
                    subtitle,
                  };
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials section",
      type: "object",
      group: "testimonials",
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
        defineField({
          name: "items",
          title: "Testimonials",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "testimonial",
              fields: [
                defineField({
                  name: "quote",
                  title: "Quote",
                  type: "localizedText",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "name",
                  title: "Name",
                  type: "localizedString",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "role",
                  title: "Role",
                  type: "localizedString",
                }),
                defineField({
                  name: "rating",
                  title: "Rating",
                  type: "number",
                  validation: (rule) => rule.required().min(1).max(5).integer(),
                  initialValue: 5,
                }),
                defineField({
                  name: "image",
                  title: "Photo",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
              preview: {
                select: { title: "name.en", media: "image" },
                prepare({ title, media }) {
                  return { title: title || "Testimonial", media };
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
      return { title: "Landing page" };
    },
  },
});
