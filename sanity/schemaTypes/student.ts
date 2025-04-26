import { defineField, defineType } from "sanity"

export default defineType({
  name: "student",
  title: "Học viên",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Họ và tên",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contact",
      title: "Thông tin liên hệ",
      type: "string",
      description: "Số điện thoại hoặc email",
    }),
    defineField({
      name: "dob",
      title: "Ngày sinh",
      type: "date",
      options: {
        dateFormat: "DD/MM/YYYY",
      },
    }),
    defineField({
      name: "parentName",
      title: "Tên phụ huynh",
      type: "string",
      description: "Đối với học viên nhỏ tuổi",
    }),
    defineField({
      name: "parentContact",
      title: "Liên hệ phụ huynh",
      type: "string",
      description: "Số điện thoại hoặc email của phụ huynh",
    }),
    defineField({
      name: "notes",
      title: "Ghi chú",
      type: "text",
      description: "Thông tin bổ sung về học viên",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "contact",
    },
  },
})
