import {defineType, defineField} from 'sanity'

export const klmPage = defineType({
  name: 'klmPage',
  title: 'KLM Page',
  type: 'document',
  groups: [
    {name: 'intro', title: 'Intro'},
    {name: 'photos', title: 'Photos'},
    {name: 'content', title: 'Content'},
  ],
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page title (h1)',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [{type: 'block'}],
      group: 'intro',
    }),
    defineField({
      name: 'magazinePhoto',
      title: 'Magazine photo (Holland Herald)',
      type: 'image',
      group: 'photos',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'groupPhotos',
      title: 'Group photos from KLM tours',
      type: 'array',
      group: 'photos',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        },
      ],
    }),
    defineField({
      name: 'routes',
      title: 'Routes',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
      description: 'Populaire routes',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'pricingNote',
      title: 'Pricing footnote',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'contactNote',
      title: 'Contact note',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
  ],
})
