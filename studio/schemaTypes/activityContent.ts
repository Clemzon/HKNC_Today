import {defineField, defineType} from 'sanity'

export const menuContentType = defineType({
  name: 'menuContent',
  title: 'Menu Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Menu Content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weeklyMenu',
      title: 'Weekly Menu',
      type: 'text',
      rows: 12,
      description: 'Paste the current week’s menu here.',
    }),
    defineField({
      name: 'weeklyMenuFile',
      title: 'Weekly Menu File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.csv',
      },
      description: 'Upload the full weekly menu file here.',
    }),
  ],
})