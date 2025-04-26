import { defineField, defineType } from "sanity"

export default defineType({
  name: "classSession",
  title: "Buổi học",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề",
      type: "string",
      description: "Ví dụ: Piano CB - T3 18:00",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "course",
      title: "Khóa học",
      type: "reference",
      to: [{ type: "course" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "teacher",
      title: "Giáo viên",
      type: "reference",
      to: [{ type: "teacher" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "room",
      title: "Phòng học",
      type: "reference",
      to: [{ type: "room" }],
    }),
    defineField({
      name: "startDateTime",
      title: "Thời gian bắt đầu",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDateTime",
      title: "Thời gian kết thúc",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "students",
      title: "Danh sách học viên",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "student" }],
        },
      ],
    }),
    defineField({
      name: "maxStudents",
      title: "Số học viên tối đa",
      type: "number",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "status",
      title: "Trạng thái",
      type: "string",
      options: {
        list: [
          { title: "Đã lên lịch", value: "scheduled" },
          { title: "Đang diễn ra", value: "ongoing" },
          { title: "Đã hoàn thành", value: "completed" },
          { title: "Đã hủy", value: "cancelled" },
        ],
      },
      initialValue: "scheduled",
    }),
    defineField({
      name: "recurringRule",
      title: "Quy tắc lặp lại",
      type: "object",
      description: "Thiết lập cho lớp học lặp lại định kỳ",
      fields: [
        {
          name: "frequency",
          title: "Tần suất",
          type: "string",
          options: {
            list: [
              { title: "Hàng ngày", value: "daily" },
              { title: "Hàng tuần", value: "weekly" },
              { title: "Hàng tháng", value: "monthly" },
            ],
          },
        },
        {
          name: "interval",
          title: "Khoảng cách",
          type: "number",
          description: "Ví dụ: 1 = mỗi tuần, 2 = cách tuần",
          initialValue: 1,
          validation: (Rule) => Rule.min(1),
        },
        {
          name: "endDate",
          title: "Ngày kết thúc",
          type: "date",
          description: "Ngày kết thúc lặp lại (để trống nếu không có)",
        },
        {
          name: "occurrences",
          title: "Số lần lặp lại",
          type: "number",
          description: "Số lần lặp lại tối đa (để trống nếu không có)",
        },
      ],
    }),
    defineField({
      name: "notes",
      title: "Ghi chú",
      type: "text",
      description: "Ghi chú bổ sung về buổi học",
    }),
  ],
  preview: {
    select: {
      title: "title",
      teacherName: "teacher.name",
      startDate: "startDateTime",
      status: "status",
    },
    prepare({ title, teacherName, startDate, status }) {
      const statusMap = {
        scheduled: "📅 Đã lên lịch",
        ongoing: "▶️ Đang diễn ra",
        completed: "✅ Đã hoàn thành",
        cancelled: "❌ Đã hủy",
      }

      const date = startDate ? new Date(startDate).toLocaleDateString("vi-VN") : ""
      const time = startDate
        ? new Date(startDate).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
        : ""

      return {
        title,
        subtitle: `${teacherName || ""} | ${date} ${time} | ${statusMap[status] || status}`,
      }
    },
  },
})
