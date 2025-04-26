import { defineField, defineType } from "sanity"

export default defineType({
  name: "room",
  title: "Phòng học",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên phòng",
      type: "string",
      description: "Ví dụ: Phòng A, Phòng B",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "capacity",
      title: "Sức chứa",
      type: "number",
      description: "Số học viên tối đa",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "text",
      description: "Thông tin thêm về phòng học",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "capacity",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Sức chứa: ${subtitle} học viên`,
      }
    },
  },
})
