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
      description: 'e.g. "Hoi — wat leuk dat je (bijna) in Seoul bent!"',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [{type: 'block'}],
      group: 'intro',
      description: 'Welkomstparagraaf',
    }),
    defineField({
      name: 'magazinePhoto',
      title: 'Magazine photo (Holland Herald)',
      type: 'image',
      group: 'photos',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
      ],
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
          fields: [
            defineField({name: 'alt', title: 'Alt text', type: 'string'}),
          ],
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
      description: 'KLM-crew prijzen',
    }),
    defineField({
      name: 'pricingNote',
      title: 'Pricing footnote',
      type: 'string',
      group: 'content',
      description: 'e.g. "Prijzen zijn exclusief eten, drinken en vervoer. Maximum groepsgrootte: 8 personen."',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
      description: 'Veelgestelde vragen',
    }),
    defineField({
      name: 'contactNote',
      title: 'Contact note',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
      description: 'Slottekst + contactgegevens',
    }),
  ],
})
