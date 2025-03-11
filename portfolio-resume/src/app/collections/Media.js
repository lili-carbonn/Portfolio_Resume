const MediaCollection = {
  slug: 'media',
  upload: {
    staticDir: 'uploads', // Stores files in the 'uploads' folder
    mimeTypes: ['image/*'], // Allows only images
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
        format: 'jpeg',
      },
      {
        name: 'medium',
        width: 600,
        height: 400,
        format: 'jpeg',
      },
      {
        name: 'large',
        width: 1200,
        height: 800,
        format: 'jpeg',
      },
    ],
    adminThumbnail: 'thumbnail', // Uses the 'thumbnail' size in the admin panel
  },
  fields: [
    {
      name: 'altText',
      type: 'text',
      label: 'Alt Text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
};

export default MediaCollection;