import {  ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { client } from "@/sanity/lib/client";
import { EventInput } from "@fullcalendar/core/index.js";
import MusicSchedulerCalendar from "@/components/admin/calendar/MusicSchedulerCalendar";

async function getData() {
  const query = `*[_type == "classSession"]{
    _id,
    title,
    startDateTime,
    endDateTime,
    "teacherName": teacher->name,
    "roomName": room->name,
    "teacherColor": teacher->color
  }`;
  const sessions = await client.fetch(query);

  // Chuyển đổi sang định dạng FullCalendar EventInput
  const events: EventInput[] = sessions.map((session: any) => ({
    id: session._id, // Dùng _id của Sanity làm id event
    title: session.title || "Unnamed Class",
    start: session.startDateTime, // Sanity datetime string -> FullCalendar sẽ parse
    end: session.endDateTime,
    // Sử dụng extendedProps để lưu trữ dữ liệu tùy chỉnh
    extendedProps: {
      sanityId: session._id,
      teacherName: session.teacherName,
      roomName: session.roomName,
      // ... các thông tin khác bạn muốn truy cập khi click event
    },
    // Tùy chỉnh màu sắc dựa trên giáo viên hoặc trạng thái
    backgroundColor: session.teacherColor || "#3788d8", // Màu mặc định nếu GV không có màu
    borderColor: session.teacherColor || "#3788d8",
  }));
  return events;
}
export default async function Dashboard() {
  
  const initialEvents = await getData();
  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-600">Tổng số học viên</h3>
              <div className="flex items-center text-amber-500">
                <ArrowDown className="w-4 h-4 mr-1" />
                <span>2</span>
              </div>
            </div>
            <p className="text-3xl font-bold">{3}</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-600">Tổng số lớp học</h3>
              <div className="flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>4</span>
              </div>
            </div>
            <p className="text-3xl font-bold">{5}</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-600">Tổng số phiên học</h3>
              <div className="flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>4</span>
              </div>
            </div>
            <p className="text-3xl font-bold">{20}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        {/* Articles Requests */}
        {/* <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Bài Viết Chờ Duyệt
            </h2>
            <Button variant="link" className="text-indigo-600">
              Xem tất cả
            </Button>
          </div>
          <Card className="bg-white">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
              <div className="mb-4">
                <Image
                  src="/icons/verified.svg"
                  alt="No requests"
                  width={100}
                  height={100}
                  className="opacity-30"
                />
              </div>
              <h3 className="mb-1 text-lg font-medium text-gray-900">
                Không Có Bài Viết
              </h3>
              <p className="text-sm text-gray-500">
                Không có yêu cầu bài viết nào đang đợi bạn đánh giá và duyệt tại
                thời điểm này.
              </p>
            </CardContent>
          </Card>
        </div> */}

        {/* Recently Added Books */}
        {/* <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Các Bài Viết Gần Đây
            </h2>
            <Button variant="link" className="text-indigo-600">
              Xem tất cả
            </Button>
          </div>
          <Card className="bg-white">
            <CardContent className="p-6">
              <Button
                variant="outline"
                className="w-full mb-6 text-gray-600 border-2 border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Book
              </Button>

              <div className="space-y-4">
                {dataArticles?.length &&
                  dataArticles
                    .slice(0, 6)
                    .map(
                      ({
                        _id,
                        thumbnail,
                        title,
                        author,
                        _createdAt,
                      }: ProjectDetailFormType) => (
                        <div key={_id} className="flex gap-3">
                          <Image
                            src={thumbnail || "/placeholder.svg"}
                            alt={title!}
                            width={45}
                            height={60}
                            className="object-cover rounded-sm"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              By {author?.name} • {author?.username}
                            </p>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(_createdAt)}
                            </div>
                          </div>
                        </div>
                      )
                    )}
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>

      {/* Articles Top Views */}
      {/* <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Bài viết xem nhiều nhất
          </h2>
          <Button variant="link" className="text-indigo-600">
            Xem tất cả
          </Button>
        </div>
        <Card className="bg-white">
          <CardContent className="p-6 grid grid-cols-2 gap-4">
            {dataArticles?.length &&
              dataArticles
                .slice(0, 6)
                .map(
                  ({
                    _id,
                    thumbnail,
                    title,
                    author,
                    views,
                  }: ProjectDetailFormType) => (
                    <div key={_id} className="flex gap-3">
                      <Image
                        src={thumbnail || "/placeholder.svg"}
                        alt={title!}
                        width={45}
                        height={60}
                        className="object-cover rounded-sm"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{title}</h4>
                        <p className="text-sm text-gray-600">
                          By {author?.name} • {author?.username}
                        </p>
                        <div className="flex items-center mt-1 ">
                          <EyeIcon className="w-3 h-3 mr-1 text-red-500" />
                          <span className="text-sm text-gray-500 font-bold">
                            {views}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
          </CardContent>
        </Card>
      </div> */}

      {/* User Avatar */}
      <div className="fixed transform -translate-x-1/2 top-6 left-1/2 md:left-auto md:right-16 md:transform-none">
        <Avatar className="w-12 h-12 border-2 border-white shadow-md">
          <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Adrian" />
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
      </div>

      <MusicSchedulerCalendar initialEvents={initialEvents} />
    </div>
  );
}
