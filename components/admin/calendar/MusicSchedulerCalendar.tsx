"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type {
  EventInput,
  EventClickArg,
  DateSelectArg,
} from "@fullcalendar/core";

import { toast } from "@/hooks/use-toast";
import { EventDetailsSheet } from "@/components/shared/EventDetailsSheet";
import ViewClassModal from "@/components/shared/ViewClassModal";

interface MusicSchedulerCalendarProps {
  initialEvents: EventInput[];
}

export default function MusicSchedulerCalendar({
  initialEvents,
}: MusicSchedulerCalendarProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] =
    React.useState<EventClickArg | null>(null);
  const [selectedDateRange, setSelectedDateRange] =
    React.useState<DateSelectArg | null>(null);
  const [isClient, setIsClient] = useState(false);

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log("Event clicked:", clickInfo.event);
    setSelectedEvent(clickInfo);
    setSelectedDateRange(null);
    setIsSheetOpen(true);
    // setIsModalOpen(true);

    // if (isMobile) {
    //   setIsModalOpen(true);
    // } else {
    //   setIsSheetOpen(true);
    // }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log("Date selected:", selectInfo);
    setSelectedEvent(null);
    setSelectedDateRange(selectInfo);
    setIsSheetOpen(true);

    // if (isMobile) {
    //   setIsModalOpen(true);
    // } else {
    //   setIsSheetOpen(true);
    // }
  };

  const handleEventDrop = async (dropInfo: any) => {
    console.log("Event dropped:", dropInfo.event);
    toast({
      title: "Đang cập nhật lịch...",
      description: `Di chuyển ${dropInfo.event.title}`,
    });
    // API call would go here
    toast({ title: "Cập nhật thành công!" });
  };

  const handleEventResize = async (resizeInfo: any) => {
    console.log("Event resized:", resizeInfo.event);
    toast({
      title: "Đang cập nhật thời lượng...",
      description: `${resizeInfo.event.title}`,
    });
    // API call would go here
    toast({ title: "Cập nhật thành công!" });
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      toast({
        title: "Đang xóa lớp học...",
        description: `${selectedEvent.event.title}`,
      });
      // API call would go here
      toast({
        title: "Xóa thành công!",
        variant: "destructive",
      });
      setIsSheetOpen(false);
    }
  };

  const handleEditEvent = () => {
    // Implement edit functionality
    toast({
      title: "Chức năng chỉnh sửa",
      description: "Chức năng này đang được phát triển",
    });
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    toast({
      title: "Đang tạo lớp học mới...",
    });
    // API call would go here
    toast({
      title: "Tạo lớp học thành công!",
      variant: "default",
    });
    setIsSheetOpen(false);
  };

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the calendar on the client side
  if (!isClient) {
    return <div className="p-4">Loading calendar...</div>;
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
        // scrollTime= '08:00'
        // slotMinTime="07:00:00"
        // slotMaxTime="22:00:00"
        allDaySlot={false}
      />

      {/* Desktop UI - Sheet for Event Details */}
      <EventDetailsSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        selectedEvent={selectedEvent}
        selectedDateRange={selectedDateRange}
        onDelete={handleDeleteEvent}
        onEdit={handleEditEvent}
        onSubmit={handleFormSubmit}
      />

      {/* Desktop UI - View Class */}
      <ViewClassModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedEvent={selectedEvent}
      />
    </div>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <div className="p-1 overflow-hidden text-xs">
      <b>{eventInfo.timeText}</b>
      <i className="block ml-1 truncate">{eventInfo.event.title}</i>
      <p className="text-[10px] truncate">
        {eventInfo.event.extendedProps.teacherName}
      </p>
      <p className="text-[10px] truncate">
        {eventInfo.event.extendedProps.roomName}
      </p>
    </div>
  );
}
