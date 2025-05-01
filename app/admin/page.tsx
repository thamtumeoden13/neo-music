import { ArrowUp, ArrowDown, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { client } from "@/sanity/lib/client";
import { EventInput } from "@fullcalendar/core/index.js";
import MusicSchedulerCalendar from "@/components/admin/calendar/MusicSchedulerCalendar";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
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
              <h3 className="font-medium text-gray-600">Tổng số phòng học</h3>
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
              <h3 className="font-medium text-gray-600">Tổng số lớp học</h3>
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
          <CardContent className="grid grid-cols-2 gap-4 p-6">
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
                          <span className="text-sm font-bold text-gray-500">
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
      <div className="fixed transform -translate-x-1/2 top-6 left-1/2 md:left-auto md:right-16 md:transform-none">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className=""
        >
          <Button
            type={"submit"}
            className={"text-white gap-4 rounded-full"}
            // disabled={isPending}
          >
            <span>{"Đăng Xuất"}</span>
            <LogOut className={"size-6 text-white"} />
          </Button>
        </form>
      </div>

      <MusicSchedulerCalendar />
    </div>
  );
}
