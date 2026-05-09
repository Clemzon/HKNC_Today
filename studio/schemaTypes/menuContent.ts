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
      description: 'Used to identify this menu content entry inside Sanity Studio.',
    }),
    defineField({
      name: 'menuIntro',
      title: 'Menu Page Introduction',
      type: 'text',
      rows: 5,
      description: 'Edit the short introduction shown near the top of the menu page.',
    }),
    defineField({
      name: 'weeklyMenu',
      title: 'Weekly Menu',
      type: 'text',
      rows: 12,
      description: 'Paste the current week’s menu here, one item per line.',
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
    defineField({
      name: 'menuNote',
      title: 'Menu Page Note',
      type: 'text',
      rows: 5,
      description: 'Edit the important note shown near the bottom of the menu page.',
    }),
  ],
})