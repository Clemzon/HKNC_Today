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
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.csv',
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
      name: 'weeklyMenuFile',
      title: 'Weekly Menu File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.csv',
      },
      description: 'Upload the full weekly menu file here.',
    }),

    defineField({
      name: 'homepageContentDivider',
      title: 'Homepage Content',
      type: 'string',
      readOnly: true,
      initialValue: 'Homepage editable sections begin below.',
      description:
        'The fields below control the editable sections on the HKNC Today homepage.',
    }),

    defineField({
      name: 'homeWelcome',
      title: 'Homepage Welcome Message',
      type: 'text',
      rows: 8,
      description: 'Edit the welcome message shown near the top of the homepage.',
    }),
    defineField({
      name: 'homePageOverview',
      title: 'Homepage Page Overview',
      type: 'text',
      rows: 8,
      description:
        'Enter each overview item on its own line. These will display as a list.',
    }),
    defineField({
      name: 'homeHeadlines',
      title: 'Homepage Headlines',
      type: 'text',
      rows: 12,
      description:
        'Add homepage headlines or news updates. Each paragraph can be placed on a new line.',
    }),
    defineField({
      name: 'homeCampusQuickLook',
      title: 'Homepage Campus Quick Look',
      type: 'text',
      rows: 8,
      description:
        'Add a short summary of what is happening around campus right now.',
    }),
    defineField({
      name: 'homeActivitiesGlance',
      title: 'Homepage Activities at a Glance',
      type: 'text',
      rows: 8,
      description:
        'Enter each activity on its own line. These will display as a list.',
    }),
    defineField({
      name: 'homeWeekGlance',
      title: 'Homepage This Week at a Glance',
      type: 'text',
      rows: 8,
      description:
        'Enter each weekly highlight on its own line. These will display as a list.',
    }),
    defineField({
      name: 'homeHighlights',
      title: 'Homepage Campus Highlights',
      type: 'text',
      rows: 8,
      description:
        'Enter each highlight or reminder on its own line. These will display as a list.',
    }),
    defineField({
      name: 'homeCafeteriaPreview',
      title: 'Homepage Cafeteria Preview',
      type: 'text',
      rows: 8,
      description:
        'Enter breakfast, lunch, dinner, or other cafeteria preview items on separate lines.',
    }),
    defineField({
      name: 'homeBenefits',
      title: 'Homepage Benefits',
      type: 'text',
      rows: 8,
      description:
        'Enter each benefit on its own line. These will display as a list.',
    }),
    defineField({
      name: 'homeMission',
      title: 'Homepage Mission Statement',
      type: 'text',
      rows: 6,
      description: 'Edit the mission statement shown near the bottom of the homepage.',
    }),
    defineField({
      name: 'homeFooter',
      title: 'Homepage Footer Message',
      type: 'text',
      rows: 4,
      description: 'Edit the short footer message shown at the bottom of the homepage.',
    }),

    defineField({
      name: 'townHallContentDivider',
      title: 'Town Hall Committee Content',
      type: 'string',
      readOnly: true,
      initialValue: 'Town Hall Committee editable sections begin below.',
      description:
        'The fields below control the editable sections on the Town Hall Committee page.',
    }),

    defineField({
      name: 'townHallIntro',
      title: 'Town Hall Page Introduction',
      type: 'text',
      rows: 6,
      description:
        'Edit the short introduction shown at the top of the Town Hall Committee page.',
    }),
    defineField({
      name: 'townHallMeetingDate',
      title: 'Upcoming Meeting Date',
      type: 'string',
      description: 'Example: April 9, 2026',
    }),
    defineField({
      name: 'townHallMeetingTime',
      title: 'Upcoming Meeting Time',
      type: 'string',
      description: 'Example: 1:45 - 2:30 PM',
    }),
    defineField({
      name: 'townHallMeetingLocation',
      title: 'Upcoming Meeting Location',
      type: 'string',
      description: 'Example: Lounge - Resident Building',
    }),
    defineField({
      name: 'townHallDiscussionTopics',
      title: 'Topics for Discussion',
      type: 'text',
      rows: 10,
      description:
        'Enter each discussion topic on its own line. These will display as a list.',
    }),
    defineField({
      name: 'townHallResourcesIntro',
      title: 'Town Hall Resources Introduction',
      type: 'text',
      rows: 6,
      description:
        'Edit the text shown above the Student Surveys section.',
    }),
    defineField({
      name: 'townHallFooter',
      title: 'Town Hall Footer Message',
      type: 'text',
      rows: 4,
      description:
        'Optional short footer message for the Town Hall Committee page.',
    }),
  ],
})