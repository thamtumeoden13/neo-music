"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formCourseSchema } from "@/lib/validation";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createCourse, updateCourse } from "@/lib/actions";
import { Course } from "@/sanity/types";
import { courseLevelList } from "@/constants";
import { Combobox, ComboboxDataType } from "./shared/ComboBox";

export type CourseFormProps = Pick<Course, "title"| "level" | "description">

const CourseForm = ({ course }: { course?: Course }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Course | null>(null);

  const [selected, setSelected] = useState<ComboboxDataType | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formDataSubmit: FormData) => {
    try {
      const formValues: CourseFormProps = {
        title: formDataSubmit.get("title") as string,
        description: formDataSubmit.get("description") as string,
        level: selected?.value as "beginner" | "basic" | "intermediate" | "advanced" | undefined,
      };

      await formCourseSchema.parseAsync(formValues);

      console.log("handleFormSubmit", formValues);

      const response = course
        ? await updateCourse(prevState, formValues, formData!._id)
        : await createCourse(prevState, formValues);

      if (response.status === "SUCCESS") {
        toast({
          title: "Success",
          description: `Your Course has been ${course ? "updated" : "created"} successfully`,
        });
      }

      router.push(`/admin/quan-ly-khoa-hoc`);

      return response;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        console.log(fieldErrors);
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
    setFormData({
      ...formData!,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (course) {
      const { _id, title, level, description } = course;

      setFormData({ ...formData!, _id, title, level, description });
    }
  }, [course]);

  return (
    <form action={formAction} className={"startup-form !max-w-5xl"}>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <div>
          <label htmlFor="title" className={"startup-form_label"}>
            {"Tiêu Đề"}
          </label>
          <Input
            id={"title"}
            name={"title"}
            value={formData?.title}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            required
            placeholder={"Tên khóa học"}
          />
          {errors.title && (
            <p className={"startup-form_error"}>{errors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="level" className={"startup-form_label"}>
            {"Cấp độ"}
          </label>
          <Combobox
            data={courseLevelList}
            initValue={course?.level}
            className={"startup-form_input justify-between"}
            onChange={(value: ComboboxDataType | null) => {
              setSelected(value);
            }}
          />
          {errors.level && (
            <p className={"startup-form_error"}>{errors.level}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className={"startup-form_label"}>
            {"Mô Tả"}
          </label>
          <Textarea
            id={"description"}
            name={"description"}
            value={formData?.description}
            className={"startup-form_textarea"}
            required
            placeholder={"Mô tả chi tiết về khóa học"}
            onChange={handleChangeForm}
          />
          {errors.description && (
            <p className={"startup-form_error"}>{errors.description}</p>
          )}
        </div>
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
export default CourseForm;
