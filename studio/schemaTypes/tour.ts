import {defineType, defineField} from 'sanity'

export const tour = defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics'},
    {name: 'hero', title: 'Hero'},
    {name: 'practicalInfo', title: 'Practical Info'},
    {name: 'itinerary', title: 'Itinerary'},
    {name: 'guide', title: 'Guide'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basics',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      group: 'basics',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card Description',
      type: 'string',
      group: 'basics',
    }),
    // Tags
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Category label shown on tour cards.',
      group: 'basics',
      options: {
        list: ['popular', 'scenery', 'food', 'culture', 'history'],
      },
    }),

    // Hero Image
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    // Intro title
    defineField({
      name: 'introTitle',
      title: 'Intro title',
      type: 'string',
      group: 'hero',
    }),

    //Intro subtitle
    defineField({
      name: 'introSubtitle',
      title: 'Intro Subtitle',
      type: 'string',
      group: 'hero',
    }),

    // Intro content
    defineField({
      name: 'introContent',
      title: 'Intro Content',
      type: 'array',
      of: [{type: 'block'}],
      group: 'hero',
    }),

    // Practical Info
    defineField({
      name: 'practicalInfo',
      title: 'Practical Info',
      type: 'object',
      group: 'practicalInfo',
      fields: [
        defineField({ name: 'duration', title: 'Duration', type: 'string' }),
        defineField({ name: 'walkingLevel', title: 'Walking Level', type: 'string' }),
        defineField({ name: 'meetingPoint', title: 'Meeting Point', type: 'string' }),
        defineField({ name: 'startTime', title: 'Start Time', type: 'string' }),
        defineField({ name: 'bestTiming', title: 'Best Timing', type: 'string' }),
      ],
    }),

    // Itinerary stops
    defineField({
      name: 'stops',
      title: 'Stops',
      type: 'array',
      group: 'itinerary',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Short label shown in the circle, e.g. 1, 2, !, ?',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
            defineField({name: 'content', title: 'Content', type: 'text'}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'subtitle'},
          },
        },
      ],
    }),

    // Guide section
    defineField({
      name: 'whyILike',
      title: 'Why I like this tour',
      type: 'text',
      rows: 3,
      group: 'guide',
    }),

    defineField({
      name: 'personalNote',
      title: 'Personal Note',
      type: 'text',
      rows: 5,
      group: 'guide',
      description: 'Shown in the teal block at the bottom of the tour page.',
    }),
  ],
})
