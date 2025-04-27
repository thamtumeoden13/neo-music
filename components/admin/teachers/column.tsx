"use client";

import { Teacher } from "@/sanity/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { displayColor } from "@/constants";

export type TeacherProps = Teacher;
export const columns: ColumnDef<TeacherProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Họ và tên</span>
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
            <span className="font-medium line-clamp-1">{request.name}</span>
            {/* <span className="text-sm text-muted-foreground line-clamp-1">
              {request.level}
            </span> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Thông tin liên hệ</span>
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
            <span className=" text-left font-medium line-clamp-1">
              {request.contact}
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
    accessorKey: "specialty",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Chuyên môn</span>
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
            <span className=" text-left font-medium line-clamp-1">
              {request.specialty}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "avatar",
    header: "Ảnh đại diện",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <Image
            src={
              typeof request.avatar === "string" ? request.avatar : "/gsap.svg"
            }
            alt={request.name!}
            width={100}
            height={100}
            className="object-cover rounded-sm"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Màu hiển thị</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const request = row.original;
      const color = displayColor.find((color) => color.value === request.color);
      return (
        <div className="flex items-center gap-3 max-w-80">
          <div className="flex flex-col">
            <span className=" text-left font-medium line-clamp-1">
              {color?.title}
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
            <Link target="_blank" href={`/hoc-vien/${request._id}`}>
              <span className="text-sm">Xem chi tiết</span>
            </Link>
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      );
    },
  },
];
