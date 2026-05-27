import {defineType, defineField} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Shown in Google search results and browser tabs. 50-60 characters ideal.',
      validation: (Rule) => Rule.max(60).warning('Longer titles may get truncated by Google'),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Shown under the title in Google search results. 150-155 characters ideal.',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions will get truncated'),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})
