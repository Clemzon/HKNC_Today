import {defineField, defineType} from 'sanity'

export const siteContentType = defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Site Content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weeklyActivities',
      title: 'Weekly Activities',
      type: 'text',
      rows: 12,
      description: 'Paste the current week’s activities here.',
    }),
    defineField({
      name: 'monthlyActivitiesFile',
      title: 'Monthly Activities File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
      description: 'Upload the full monthly activities file here.',
    }),
    defineField({
      name: 'weeklyMenu',
      title: 'Weekly Menu',
      type: 'text',
      rows: 12,
      description: 'Paste the current week’s menu here.',
    }),
    defineField({
      name: 'monthlyMenuFile',
      title: 'Monthly Menu File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
      description: 'Upload the full monthly menu file here.',
    }),
  ],
})