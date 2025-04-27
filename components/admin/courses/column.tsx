"use client";

import { Course } from "@/sanity/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { courseLevelList } from "@/constants";

export type CourseProps = Course 
export const columns: ColumnDef<CourseProps>[] = [
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
              {request.level}
            </span> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Cấp độ</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const request = row.original;
      const level = courseLevelList.find(
        (level) => level.value === request.level
      );
      return (
        <div className="flex items-center gap-3 max-w-80">
          <div className="flex flex-col">
            <span className=" text-left font-medium line-clamp-1">{level?.title}</span>
            {/* <span className="text-sm text-muted-foreground line-clamp-1">
              {request.level}
            </span> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex flex-col max-w-80">
          <span className="line-clamp-2">{request.description}</span>
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
            <Link target="_blank" href={`/khoa-hoc/${request?._id}`}>
              <span className="text-sm">Xem chi tiết</span>
            </Link>
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      );
    },
  },
];
