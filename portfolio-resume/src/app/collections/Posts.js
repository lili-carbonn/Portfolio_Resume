export const Posts = {
  slug: "posts",
  hooks: {
    beforeChange: [
      ({ data }) => {
        return data;
      }
    ]
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Card Description',
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Card Image',
          relationTo: 'media', // Assumes you have a 'media' collection
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Post Image',
      relationTo: 'media', // Assumes you have a 'media' collection
    },
    {
      name: 'link',
      type: 'url',
      label: 'Project Link',
      admin: {
        description: 'URL to the project (e.g., GitHub repository, live demo, etc.)',
        condition: (data) => {
          return data?.type === 'project';
        },
      },
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "content",
      options: [
        {
          label: "About",
          value: "about",
        },
        {
          label: "Contact",
          value: "contact",
        },
        {
          label: "Content",
          value: "content",
        },
        {
          label: "Project",
          value: "project",
        },
      ],
      admin: {
        position: "sidebar",
        description: "Select the type of post",
      },
    },
    {
      name: 'additionalInfoLink',
      type: 'text',
      label: 'Additional Information Link',
      admin: {
        description: 'URL to additional information about the project',
        condition: (data) => {
          return data?.type === 'project';
        },
      },
    },
  ],
  admin: {
    useAsTitle: "title",
  },
};
