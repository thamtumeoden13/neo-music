"use client";

import { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Room } from "@/sanity/types";
import { DenyAccountDialog } from "@/components/ui/confirmation-dialogs";
import { clientNoCache } from "@/sanity/lib/client";
import { ROOMS_BY_QUERY } from "@/sanity/lib/queries";
import { deleteById } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import TableComponent, {
  DataProps,
} from "@/components/admin/table/TableComponent";
import Link from "next/link";
import { columns } from "@/components/admin/rooms/column";

export default function RoomsTable() {
  const router = useRouter();

  const [rooms, setRooms] = useState<Room[]>([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const openDeleteDialog = (request: DataProps) => {
    setSelectedRequestId(request._id);
    setDeleteDialogOpen(true);
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

      getRooms();
    }
  };

  const handleEdit = async (request: DataProps) => {
    console.log("TableComponent -> path", request);
    router.push(`/admin/quan-ly-phong-hoc/${request._id}`);
  };

  const getRooms = async () => {
    const params = { search: null };
    const searchForProjects = await clientNoCache.fetch(
      ROOMS_BY_QUERY,
      params
    );
    setRooms(searchForProjects);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const _columns: ColumnDef<Room>[] = [
    ...columns,
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            asChild
          >
            <Link href="/admin/quan-ly-phong-hoc/new">
              <span className="flex items-center">
                <span className="mr-1">+</span> Tạo phòng học mới
              </span>
            </Link>
          </Button>
        </div>
        <TableComponent
          data={rooms}
          columns={_columns as ColumnDef<DataProps>[]}
          title="Danh sách phòng học"
          // openApproveDialog={openApproveDialog}
          // openDenyDialog={openDenyDialog}
          openDeleteDialog={openDeleteDialog}
          onEdit={handleEdit}
        />
      </section>

      {/* Dialogs */}

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
