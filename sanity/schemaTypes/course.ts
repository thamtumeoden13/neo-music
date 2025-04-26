import { defineField, defineType } from "sanity"

export default defineType({
  name: "course",
  title: "Khóa học",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên khóa học",
      type: "string",
      description: "Ví dụ: Piano Cơ bản, Guitar Nâng cao",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Cấp độ",
      type: "string",
      description: "Ví dụ: Vỡ lòng, Cơ bản, Nâng cao",
      options: {
        list: [
          { title: "Vỡ lòng", value: "beginner" },
          { title: "Cơ bản", value: "basic" },
          { title: "Trung cấp", value: "intermediate" },
          { title: "Nâng cao", value: "advanced" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "text",
      description: "Thông tin chi tiết về khóa học",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "level",
    },
    prepare({ title, subtitle }) {
      const levelMap = {
        beginner: "Vỡ lòng",
        basic: "Cơ bản",
        intermediate: "Trung cấp",
        advanced: "Nâng cao",
      }
      return {
        title,
        subtitle: levelMap[subtitle] || subtitle,
      }
    },
  },
})
