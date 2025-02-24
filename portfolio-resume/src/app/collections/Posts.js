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
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // If type is about or contact, use that as the slug
        if (data.type === "about" || data.type === "contact") {
          data.slug = data.type;
        }
        return data;
      },
    ],
  },
};
