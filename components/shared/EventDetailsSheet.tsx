"use client";

import type { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Pencil, Trash2 } from "lucide-react";
import ClassSessionForm from "../ClassSessionForm";
import { useEffect, useState } from "react";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
import { clientNoCache } from "@/sanity/lib/client";
import { CLASS_SESSION_BY_ID_QUERY } from "@/sanity/lib/queries";

interface EventDetailsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEvent: EventClickArg | null;
  selectedDateRange?: DateSelectArg | null;
  onDelete?: () => void;
  onEdit?: () => void;
  onSubmit?: (formData: any) => void;
}

export function EventDetailsSheet({
  isOpen,
  onOpenChange,
  selectedEvent,
  selectedDateRange,
  onDelete,
  onEdit,
  onSubmit,
}: EventDetailsSheetProps) {
  const [classSession, setClassSession] = useState(undefined);

  useEffect(() => {
    const getClassSession = async (id: string) => {
      const res = await clientNoCache.fetch(CLASS_SESSION_BY_ID_QUERY, {
        id,
      });

      console.log('getClassSession -> res',res)

      setClassSession(res);
    };

    if (selectedEvent?.event?.extendedProps?.sanityId) {
      getClassSession(selectedEvent?.event?.extendedProps.sanityId);
    }
  }, [selectedEvent]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="max-h-[screen] bg-white sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Chi tiết lớp học</SheetTitle>
          {/* <SheetTitle>{classSession?.title}</SheetTitle> */}
        </SheetHeader>
        <div className="max-w-[40vw] max-h-[90vh] overflow-y-auto">
          <ClassSessionForm
            selectedDateRange={selectedDateRange}
            classSession={classSession}
          />
        </div>

        {/* <SheetFooter className="flex-col h-40 gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onEdit}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Chỉnh sửa
          </Button>
          {selectedEvent && (
            <Button
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa lớp
            </Button>
          )}
          <SheetClose asChild>
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => onOpenChange(false)}
            >
              Đóng
            </Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
