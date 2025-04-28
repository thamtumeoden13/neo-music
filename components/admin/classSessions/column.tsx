"use client";

import { ClassSession, Course, Room, Student, Teacher } from "@/sanity/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import dayjs from 'dayjs';

type ClassSessionProps = Omit<
  ClassSession,
  "course" | "teacher" | "room" | "students"
> & { course?: Course } & { room?: Room } & { teacher?: Teacher } & {
  students?: Student[];
};
export const columns: ColumnDef<ClassSessionProps>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Tiêu đề</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex items-center gap-3 max-w-80">
          <div className="flex flex-col">
            <span className="font-medium line-clamp-1">{request.title}</span>
            {/* <span className="text-sm text-muted-foreground line-clamp-1">
              {request.subtitle}
            </span> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "startDateTime",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Thời gian bắt đầu</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex items-center justify-center gap-3 max-w-80">
          <div className="flex flex-col">
            <span className=" text-left font-medium line-clamp-1">
              {dayjs(request.startDateTime).format('YYYY/MM/DD HH:mm A')}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "endDateTime",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Thời gian kết thúc</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex items-center justify-center gap-3 max-w-80">
          <div className="flex flex-col">
            <span className=" text-left font-medium line-clamp-1">
              {dayjs(request.endDateTime).format('YYYY/MM/DD HH:mm A')}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "maxStudents",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Số học viên tối đa</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex items-center justify-center gap-3 max-w-80">
          <div className="flex flex-col">
            <span className=" text-left font-medium line-clamp-1">
              {request?.maxStudents}
            </span>
            {/* <span className="text-sm text-muted-foreground line-clamp-1">
              {request.level}
            </span> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "viewDetail",
    header: "Đường dẫn",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex items-center justify-center gap-3">
          <Button variant="link" className="px-2 h-auto p-0 text-blue-500">
            <Link target="_blank" href={`/quan-ly-phien-hoc/${request._id}`}>
              <span className="text-sm">Xem chi tiết</span>
            </Link>
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      );
    },
  },
];
