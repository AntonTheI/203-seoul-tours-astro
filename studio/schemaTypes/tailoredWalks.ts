import {defineType, defineField} from 'sanity'

export const tailoredWalks = defineType({
  name: 'tailoredWalks',
  title: 'Tailor-made Tours Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'body', title: 'Body text'},
    {name: 'cta', title: 'CTA'},
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Page title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtitle (italic line under the title)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'bodyText',
      title: 'Body text',
      type: 'array',
      of: [{type: 'block'}],
      group: 'body',
    }),
    defineField({
      name: 'closingLine',
      title: 'Closing line (italic)',
      type: 'string',
      group: 'body',
    }),
    defineField({
      name: 'ctaTagline',
      title: 'CTA tagline',
      type: 'string',
      group: 'cta',
    }),
  ],
})
