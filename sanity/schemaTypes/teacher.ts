import { defineField, defineType } from "sanity"

export default defineType({
  name: "teacher",
  title: "Giáo viên",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên giáo viên",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specialty",
      title: "Chuyên môn",
      type: "string",
      description: "Ví dụ: Piano, Guitar, Violin",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contact",
      title: "Thông tin liên hệ",
      type: "string",
      description: "Số điện thoại hoặc email",
    }),
    defineField({
      name: "avatar",
      title: "Ảnh đại diện",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "color",
      title: "Màu hiển thị",
      type: "string",
      description: "Màu hiển thị trên lịch",
      options: {
        list: [
          { title: "Đỏ", value: "#f87171" },
          { title: "Cam", value: "#fb923c" },
          { title: "Vàng", value: "#facc15" },
          { title: "Xanh lá", value: "#4ade80" },
          { title: "Xanh dương", value: "#60a5fa" },
          { title: "Tím", value: "#a78bfa" },
          { title: "Hồng", value: "#f472b6" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "specialty",
      media: "avatar",
    },
  },
})
