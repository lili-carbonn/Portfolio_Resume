export const Posts = {
  slug: "posts",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "content",
      options: [
        {
          label: "About Page",
          value: "about",
        },
        {
          label: "Contact Page",
          value: "contact",
        },
        {
          label: "General Content",
          value: "content",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
  admin: {
    useAsTitle: "title",
  },
};
