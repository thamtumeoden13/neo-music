"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formClassSessionSchema } from "@/lib/validation";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createClassSession, updateClassSession } from "@/lib/actions";
import { Combobox, ComboboxDataType } from "./shared/ComboBox";
import { clientNoCache } from "@/sanity/lib/client";
import {
  COURSES_BY_QUERY,
  ROOMS_BY_QUERY,
  STUDENTS_BY_QUERY,
  TEACHERS_BY_QUERY,
} from "@/sanity/lib/queries";
import { ClassSession, Course, Room, Student, Teacher } from "@/sanity/types";
import { MultiSelect, MultiSelectOption } from "./shared/MultiSelect";
import { classSessionList } from "@/constants";
import {
  DatePickerWithRange,
  DateTimeRange,
} from "./shared/DatePickerWithRange";

type initValueProps = {
  course?: string;
  room?: string;
  teacher?: string;
  status?: string;
  students?: string[];
};

type SelectedProps = {
  course?: ComboboxDataType | null;
  room?: ComboboxDataType | null;
  teacher?: ComboboxDataType | null;
  status?: ComboboxDataType | null;
  students?: MultiSelectOption[];
};

export type ClassSessionFormType = Omit<
  ClassSession,
  "course" | "room" | "teacher" | "students"
> & {
  course?: Course;
} & { room?: Room } & { teacher?: Teacher } & {
  students?: Student[];
};

export type ClassSessionFormValues = Pick<
  ClassSession,
  "title" | "maxStudents" | "notes" | "startDateTime" | "endDateTime"
> &
  initValueProps;

const ClassSessionForm = ({
  classSession,
}: {
  classSession?: ClassSessionFormType;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ClassSessionFormType | null>(null);
  const [initValue, setInitValue] = useState<initValueProps>({});

  const [selected, setSelected] = useState<SelectedProps>({
    course: null,
    room: null,
    teacher: null,
    status: null,
  });
  const [studentSelected, setStudentSelected] = useState<string[]>([]);
  const [courses, setCourses] = useState<ComboboxDataType[]>([]);
  const [rooms, setRooms] = useState<ComboboxDataType[]>([]);
  const [teachers, setTeachers] = useState<ComboboxDataType[]>([]);
  const [students, setStudents] = useState<MultiSelectOption[]>([]);

  const [selectedRange, setSelectedRange] = useState<DateTimeRange>({
    from: undefined,
    to: undefined,
  });

  const handleFormSubmit = async (
    prevState: { error: string; status: string },
    formData: FormData
  ) => {
    try {
      const formValues: ClassSessionFormValues = {
        title: formData.get("title") as string,
        maxStudents: Number(formData.get("maxStudents")) as number,
        notes: formData.get("notes") as string,
        startDateTime: selectedRange.from
          ? selectedRange.from.toISOString()
          : undefined,
        endDateTime: selectedRange.to
          ? selectedRange.to.toISOString()
          : undefined,
        course: selected.course?.value as string,
        room: selected.room?.value as string,
        teacher: selected.teacher?.value as string,
        status: selected.status?.value as string,
        students: studentSelected as string[],
      };

      console.log({ formValues });
      await formClassSessionSchema.parseAsync(formValues);

      const response = classSession
        ? await updateClassSession(formValues, classSession._id)
        : await createClassSession(formValues);

      if (response.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your project pitch has been created successfully",
        });
      }

      // router.push(`/bai-viet/${selected?.slug?.current}`)
      router.push(`/admin/quan-ly-phien-hoc`);
      return response;
    } catch (error) {
      console.error("ProjectDetailForm -> handleFormSubmit", error);
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  const handleChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) {
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelected = (
    key: keyof SelectedProps,
    value: ComboboxDataType | null
  ) => {
    setSelected({
      ...selected,
      [key]: value,
    });
  };
  const handleDateRangeChange = (range: DateTimeRange) => {
    setSelectedRange(range);
    console.log("Selected range:", range);
  };

  useEffect(() => {
    const getInitSelectData = async () => {
      const [course, students, teachers, rooms] = await Promise.all([
        clientNoCache.fetch(COURSES_BY_QUERY, { search: null }),
        clientNoCache.fetch(STUDENTS_BY_QUERY, { search: null }),
        clientNoCache.fetch(TEACHERS_BY_QUERY, { search: null }),
        clientNoCache.fetch(ROOMS_BY_QUERY, { search: null }),
        ,
      ]);

      setCourses(
        course.map((item: Course) => ({
          title: item.title,
          value: item._id,
        }))
      );
      setRooms(
        rooms.map((item: Room) => ({
          title: item.name,
          value: item._id,
        }))
      );
      setTeachers(
        teachers.map((item: Teacher) => ({
          title: item.name,
          value: item._id,
        }))
      );
      setStudents(
        students.map((item: Student) => ({
          title: item.name,
          value: item._id,
        }))
      );
    };

    getInitSelectData();
  }, []);

  useEffect(() => {
    if (classSession) {
      const {
        title,
        startDateTime,
        endDateTime,
        maxStudents,
        status,
        course,
        teacher,
        room,
        students,
      } = classSession;

      const _formData = {
        ...formData!,
        title,
        startDateTime,
        endDateTime,
        maxStudents,
        status,
      };

      console.log("post -> _formData", _formData);

      setFormData({ ..._formData });

      const initStudents = students?.map((item) => item._id) || [];
      setStudentSelected(initStudents);
      setInitValue({
        course: course?._id,
        teacher: teacher?._id,
        room: room?._id,
      });
    }
  }, [classSession]);

  console.log("post -> formData", formData);
  console.log("post -> initValue", initValue);

  return (
    <form action={formAction} className={"startup-form"}>
      <div>
        <label htmlFor="title" className={"startup-form_label"}>
          {"Tiêu Đề"}
        </label>
        <Input
          id={"title"}
          name={"title"}
          className={"startup-form_input"}
          required
          placeholder={"Vui lòng nhập tiêu đề"}
          value={formData?.title}
          onChange={handleChangeForm}
        />
        {errors.title && <p className={"startup-form_error"}>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="status" className={"startup-form_label"}>
          {"Trạng thái"}
        </label>
        <Combobox
          data={classSessionList}
          initValue={classSession?.status}
          className={"startup-form_input justify-between"}
          onChange={(value: ComboboxDataType | null) => {
            handleSelected("status", value);
          }}
        />
        {errors.status && (
          <p className={"startup-form_error"}>{errors.status}</p>
        )}
      </div>
      <div>
        <label htmlFor="maxStudents" className={"startup-form_label "}>
          {"Số học viên tối đa"}
        </label>
        <Input
          id={"maxStudents"}
          name={"maxStudents"}
          className={"startup-form_input"}
          placeholder={"Số học viên tối đa"}
          required
          type="number"
          min={0}
          value={formData?.maxStudents}
          onChange={handleChangeForm}
        />
        {errors.maxStudents && (
          <p className={"startup-form_error"}>{errors.maxStudents}</p>
        )}
      </div>
      <div>
        <label htmlFor="maxStudents" className={"startup-form_label "}>
          {"Thời gian bắt đầu - Thời gian kết thúc"}
        </label>
        <DatePickerWithRange onChange={handleDateRangeChange} />
        {/* {errors.maxStudents && (
          <p className={"startup-form_error"}>{errors.maxStudents}</p>
        )} */}
      </div>

      <div>
        <label htmlFor="course" className={"startup-form_label"}>
          {"Khóa học"}
        </label>
        <Combobox
          data={courses}
          initValue={initValue.course}
          className={"startup-form_input justify-between"}
          onChange={(value: ComboboxDataType | null) => {
            handleSelected("course", value);
          }}
        />
        {errors.course && (
          <p className={"startup-form_error"}>{errors.course}</p>
        )}
      </div>

      <div>
        <label htmlFor="teacher" className={"startup-form_label"}>
          {"Giáo viên"}
        </label>
        <Combobox
          data={teachers}
          initValue={initValue.teacher}
          className={"startup-form_input justify-between"}
          onChange={(value: ComboboxDataType | null) => {
            handleSelected("teacher", value);
          }}
        />
        {errors.teacher && (
          <p className={"startup-form_error"}>{errors.teacher}</p>
        )}
      </div>
      <div>
        <label htmlFor="room" className={"startup-form_label"}>
          {"Phòng học"}
        </label>
        <Combobox
          data={rooms}
          initValue={initValue.room}
          className={"startup-form_input justify-between"}
          onChange={(value: ComboboxDataType | null) => {
            handleSelected("room", value);
          }}
        />
        {errors.room && <p className={"startup-form_error"}>{errors.room}</p>}
      </div>
      <div>
        <label htmlFor="students" className={"startup-form_label"}>
          {"Danh sách học viên"}
        </label>
        <MultiSelect
          options={students}
          selected={studentSelected}
          onChange={setStudentSelected}
          className={"startup-form_input justify-between"}
          placeholder={"Add Team Members"}
        />
        {errors.students && (
          <p className={"startup-form_error"}>{errors.students}</p>
        )}
      </div>
      <div>
        <label htmlFor="notes" className={"startup-form_label"}>
          {"Ghi chú"}
        </label>
        <Textarea
          id={"notes"}
          name={"notes"}
          value={formData?.notes}
          className={"startup-form_textarea"}
          required
          placeholder={"Ghi chú bổ sung về buổi học"}
          onChange={handleChangeForm}
        />
        {errors.notes && <p className={"startup-form_error"}>{errors.notes}</p>}
      </div>

      <Button
        type={"submit"}
        className={"startup-form_btn text-white"}
        disabled={isPending}
      >
        {isPending ? "Đang lưu..." : "Lưu"}
        <Send className={"size-6 ml-2"} />
      </Button>
    </form>
  );
};
export default ClassSessionForm;
