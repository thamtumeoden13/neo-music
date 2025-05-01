"use client";

import { useEffect, useState } from "react";
import { ClassSession, Course, Room, Student, Teacher } from "@/sanity/types";
import {
  ApproveAccountDialog,
  DenyAccountDialog,
} from "@/components/ui/confirmation-dialogs";
import { clientNoCache } from "@/sanity/lib/client";
import { CLASS_SESSIONS_BY_QUERY } from "@/sanity/lib/queries";
import { deleteById, publishedClassSession } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import TableComponent, {
  DataProps,
} from "@/components/admin/table/TableComponent";
import { columns } from "@/components/admin/classSessions/column";

import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Check, EditIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { classSessionList } from "@/constants";
import { cn } from "@/lib/utils";

type ClassSessionProps = Omit<
  ClassSession,
  "course" | "teacher" | "room" | "students"
> & { course?: Course } & { room?: Room } & { teacher?: Teacher } & {
  students?: Student[];
};

export default function ClassSessionsTable() {
  const router = useRouter();

  const [classSessions, setClassSessions] = useState<ClassSessionProps[]>([]);

  const [denyDialogOpen, setDenyDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    null
  );

  const openDeleteDialog = (request: DataProps) => {
    setSelectedRequestId(request._id);
    setDeleteDialogOpen(true);
  };

  const openApproveDialog = (request: DataProps) => {
    setSelectedRequestId(request._id);
    setApproveDialogOpen(true);
  };

  const openDenyDialog = (request: DataProps) => {
    setSelectedRequestId(request._id);
    setDenyDialogOpen(true);
  };

  const handleApproveAccount = async () => {
    setApproveDialogOpen(false);
    setSelectedRequestId(null);
    if (selectedRequestId) {
      const { error, status } = await publishedClassSession(
        selectedRequestId,
        selectedStatus as string
      );

      if (status === "ERROR") {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your article has been approved successfully",
        // variant: "destructive",
      });

      getClassSessions();
    }
  };

  const handleRejectAccount = async () => {
    setDenyDialogOpen(false);
    setSelectedRequestId(null);
    if (selectedRequestId) {
      const { error, status } = await publishedClassSession(
        selectedRequestId,
        selectedStatus as string
      );

      if (status === "ERROR") {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your article has been rejected successfully",
        // variant: "destructive",
      });

      getClassSessions();
    }
  };

  const handleDeleteRequest = async () => {
    setDeleteDialogOpen(false);
    setSelectedRequestId(null);
    if (selectedRequestId) {
      const { error, status } = await deleteById(selectedRequestId);
      if (status === "ERROR") {
        console.error("ProjectTable -> handleDelete", error);
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your item has been deleted successfully",
      });

      getClassSessions();
    }
  };

  const handleEdit = async (request: DataProps) => {
    console.log("TableComponent -> path", request);
    router.push(`/admin/quan-ly-phien-hoc/${request._id}`);
  };

  const getClassSessions = async () => {
    const params = { search: null };
    const searchForProjects = await clientNoCache.fetch(
      CLASS_SESSIONS_BY_QUERY,
      params
    );
    setClassSessions(searchForProjects);
    console.log("getClassSessions -> searchForProjects", searchForProjects);
  };

  useEffect(() => {
    getClassSessions();
  }, []);

  const handlePublishedChange = (
    request: ClassSessionProps,
    newStatus: "scheduled" | "ongoing" | "completed" | "cancelled"
  ) => {
    setSelectedStatus(newStatus);
    if (newStatus === "cancelled") {
      openDenyDialog(request);
    } else {
      openApproveDialog(request);
    }
  };

  const _columns: ColumnDef<ClassSessionProps>[] = [
    ...columns,
    {
      accessorKey: "published",
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="p-0 hover:bg-transparent"
            >
              <span>Trạng thái</span>
              <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const request = row.original;
        const roleColor = classSessionList.find(
          (item) => item.value === request.status
        );
        const title = classSessionList.find(
          (item) => item.value === request.status
        );
        console.log("roleColor", roleColor?.color);
        return (
          <div className="w-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "px-4 py-1 h-auto font-medium",
                    roleColor?.bgColor
                  )}
                >
                  {title?.title}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={request.status}
                  onValueChange={(value: string) =>
                    handlePublishedChange(
                      request,
                      value as
                        | "scheduled"
                        | "ongoing"
                        | "completed"
                        | "cancelled"
                    )
                  }
                >
                  {classSessionList.map((item) => (
                    <DropdownMenuRadioItem
                      value={item.value}
                      className={`${item.color}`}
                      key={item.value}
                      onClick={() => {
                        setSelectedRequestId(item.value);
                      }}
                    >
                      {item.title}
                      {request.status === item.value && (
                        <Check className="w-4 h-4 ml-auto" />
                      )}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const request = row.original;

        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-red-500 border border-red-100 rounded-full"
              onClick={() => openDeleteDialog(request)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-blue-500 border border-blue-100 rounded-full"
              onClick={() => handleEdit(request)}
            >
              <EditIcon className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <section className="w-full bg-white rounded-2xl p-7">
        <div className="flex items-center justify-end px-6">
          <Button
            className="text-white bg-indigo-600 hover:bg-indigo-700"
            asChild
          >
            <Link href="/admin/quan-ly-phien-hoc/new">
              <span className="flex items-center">
                <span className="mr-1">+</span> Tạo lớp học mới
              </span>
            </Link>
          </Button>
        </div>
        <TableComponent
          data={classSessions}
          columns={_columns as ColumnDef<DataProps>[]}
          title="Danh sách bài viết"
          openApproveDialog={openApproveDialog}
          openDenyDialog={openDenyDialog}
          openDeleteDialog={openDeleteDialog}
          onEdit={handleEdit}
        />
      </section>

      {/* Dialogs */}
      <DenyAccountDialog
        open={denyDialogOpen}
        onOpenChange={setDenyDialogOpen}
        onConfirm={handleRejectAccount}
      />

      <ApproveAccountDialog
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
        onConfirm={handleApproveAccount}
      />

      <DenyAccountDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteRequest}
        title="Delete Request"
        description="Are you sure you want to delete this request? This action cannot be undone."
        buttonTitle="Delete Request"
      />
    </>
  );
}
