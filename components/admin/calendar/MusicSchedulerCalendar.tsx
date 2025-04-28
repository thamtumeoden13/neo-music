"use client"

import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import type { EventInput, EventClickArg, DateSelectArg } from "@fullcalendar/core"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";

interface MusicSchedulerCalendarProps {
  initialEvents: EventInput[]
}

export default function MusicSchedulerCalendar({ initialEvents }: MusicSchedulerCalendarProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<EventClickArg | null>(null)
  const [selectedDateRange, setSelectedDateRange] = React.useState<DateSelectArg | null>(null)
  const { toast } = useToast()

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log("Event clicked:", clickInfo.event)
    setSelectedEvent(clickInfo)
    setSelectedDateRange(null)
    setIsModalOpen(true)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log("Date selected:", selectInfo)
    setSelectedEvent(null)
    setSelectedDateRange(selectInfo)
    setIsModalOpen(true)
  }

  const handleEventDrop = async (dropInfo: any) => {
    console.log("Event dropped:", dropInfo.event)
    toast({ title: "Đang cập nhật lịch...", description: `Di chuyển ${dropInfo.event.title}` })
    // API call would go here
    toast({ title: "Cập nhật thành công!" })
  }

  const handleEventResize = async (resizeInfo: any) => {
    console.log("Event resized:", resizeInfo.event)
    toast({ title: "Đang cập nhật thời lượng...", description: `${resizeInfo.event.title}` })
    // API call would go here
    toast({ title: "Cập nhật thành công!" })
  }

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="timeGridWeek"
        weekends={true}
        events={initialEvents}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        editable={true}
        eventClick={handleEventClick}
        select={handleDateSelect}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventContent={renderEventContent}
        locale="vi"
        slotMinTime="08:00:00"
        slotMaxTime="21:00:00"
        allDaySlot={false}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] bg-white-100">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent
                ? `Chi tiết lớp: ${selectedEvent.event.title}`
                : selectedDateRange
                  ? "Tạo lớp học mới"
                  : "Thông tin"}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent
                ? `Giáo viên: ${selectedEvent.event.extendedProps.teacherName || "N/A"}`
                : selectedDateRange
                  ? `Từ ${selectedDateRange.startStr} đến ${selectedDateRange.endStr}`
                  : ""}
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div>
              <p>Phòng: {selectedEvent.event.extendedProps.roomName || "N/A"}</p>
              <p>Học viên: ... (Load danh sách nếu cần)</p>
            </div>
          )}

          {selectedDateRange && (
            <div>
              <p>Form tạo lớp mới...</p>
            </div>
          )}

          <DialogFooter>
            {selectedEvent && <Button variant="destructive">Xóa lớp</Button>}
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function renderEventContent(eventInfo: any) {
  return (
    <div className="p-1 text-xs overflow-hidden">
      <b>{eventInfo.timeText}</b>
      <i className="ml-1 truncate block">{eventInfo.event.title}</i>
      <p className="text-[10px] truncate">{eventInfo.event.extendedProps.teacherName}</p>
      <p className="text-[10px] truncate">{eventInfo.event.extendedProps.roomName}</p>
    </div>
  )
}
