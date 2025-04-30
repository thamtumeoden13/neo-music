"use client";

import * as React from "react";
import { CalendarClock, MapPin, User, Users } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface CreateClassDrawerProps {
  isOpen: boolean;
  selectedEvent: EventClickArg | null;
  onOpenChange: (open: boolean) => void;
  onSubmit?: () => void;
}

export function ViewClassModal({
  isOpen,
  selectedEvent,
  onOpenChange,
}: CreateClassDrawerProps) {
  if (!selectedEvent) return null;

  const event = selectedEvent.event;
  const { teacherName, roomName, students } = event.extendedProps;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] bg-white-100">
        <DialogHeader>
          <DialogTitle>
            {`Chi tiết lớp: ${selectedEvent.event.title}`}
          </DialogTitle>
          <DialogDescription>
            {`Giáo viên: ${selectedEvent.event.extendedProps.teacherName || "N/A"}`}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="flex items-center space-x-4">
            <CalendarClock className="w-5 h-5 text-muted-foreground" />
            <div>
              <Label className="text-muted-foreground">Thời gian</Label>
              <p className="font-medium">
                {event.start && dayjs(event.start).format("YYYY/MM/DD HH:mm A")}
                {event.end && (
                  <>
                    {" - "}
                    {dayjs(event.end).format("YYYY/MM/DD HH:mm A")}
                  </>
                )}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-4">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <Label className="text-muted-foreground">Giáo viên</Label>
              <p className="font-medium">{teacherName || "Chưa phân công"}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-4">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <div>
              <Label className="text-muted-foreground">Phòng học</Label>
              <p className="font-medium">{roomName || "Chưa phân phòng"}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start space-x-4">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <Label className="text-muted-foreground">Học viên</Label>
              {students && students.length > 0 ? (
                <ul className="list-disc list-inside">
                  {students.map((student: string, index: number) => (
                    <li key={index} className="font-medium">
                      {student}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-medium">Chưa có học viên</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewClassModal;
