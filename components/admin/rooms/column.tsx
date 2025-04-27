"use client";

import {  Room } from "@/sanity/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";

export type RoomProps = Room 
export const columns: ColumnDef<RoomProps>[] = [
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
            <span>Tên Phòng</span>
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
    accessorKey: "capacity",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Sức chứa</span>
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
            <span className=" text-left font-medium line-clamp-1">{request?.capacity}</span>
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
            <Link target="_blank" href={`/phong-hoc/${request?._id}`}>
              <span className="text-sm">Xem chi tiết</span>
            </Link>
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      );
    },
  },
];
