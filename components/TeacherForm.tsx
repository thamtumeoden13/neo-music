"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formTeacherSchema } from "@/lib/validation";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { Teacher } from "@/sanity/types";
import { displayColor } from "@/constants";
import { Combobox, ComboboxDataType } from "./shared/ComboBox";

export type TeacherFormProps = Pick<
  Teacher,
  "name" | "contact" | "specialty" | "avatar" | "color"
>;

const TeacherForm = ({ teacher }: { teacher?: Teacher }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Teacher | null>(null);

  const [selected, setSelected] = useState<ComboboxDataType | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formDataSubmit: FormData) => {
    try {
      const formValues: TeacherFormProps = {
        name: formDataSubmit.get("name") as string,
        contact: formDataSubmit.get("contact") as string,
        specialty: formDataSubmit.get("specialty") as string,
        color: selected?.value as
          | "#f87171"
          | "#fb923c"
          | "#facc15"
          | "#4ade80"
          | "#60a5fa"
          | "#a78bfa"
          | "#f472b6"
          | undefined,
      };

      await formTeacherSchema.parseAsync(formValues);

      console.log("handleFormSubmit", formValues);

      const response = teacher
        ? await updateTeacher(prevState, formValues, formData!._id)
        : await createTeacher(prevState, formValues);

      if (response.status === "SUCCESS") {
        toast({
          title: "Success",
          description: `Your Teacher has been ${teacher ? "updated" : "created"} successfully`,
        });
      }

      router.push(`/admin/ho-so-giao-vien`);

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
    if (teacher) {
      const { _id, name, contact, specialty, avatar, color } = teacher;

      setFormData({
        ...formData!,
        _id,
        name,
        contact,
        specialty,
        avatar,
        color,
      });
    }
  }, [teacher]);

  return (
    <form action={formAction} className={"startup-form !max-w-5xl"}>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <div>
          <label htmlFor="name" className={"startup-form_label"}>
            {"Tên giáo viên"}
          </label>
          <Input
            id={"name"}
            name={"name"}
            value={formData?.name}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            required
            placeholder={"Tên giáo viên"}
          />
          {errors.name && (
            <p className={"startup-form_error"}>{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact" className={"startup-form_label"}>
            {"Thông tin liên hệ"}
          </label>
          <Input
            id={"contact"}
            name={"contact"}
            value={formData?.contact}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            placeholder={"Số điện thoại hoặc email"}
          />
          {errors.contact && (
            <p className={"startup-form_error"}>{errors.contact}</p>
          )}
        </div>
        <div>
          <label htmlFor="specialty" className={"startup-form_label"}>
            {"Chuyên môn"}
          </label>
          <Input
            id={"specialty"}
            name={"specialty"}
            value={formData?.specialty}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            required
            placeholder={"Ví dụ: Piano, Guitar, Violin"}
          />
          {errors.specialty && (
            <p className={"startup-form_error"}>{errors.specialty}</p>
          )}
        </div>
        <div>
          <label htmlFor="level" className={"startup-form_label"}>
            {"Màu hiển thị"}
          </label>
          <Combobox
            data={displayColor}
            initValue={teacher?.color}
            className={"startup-form_input justify-between"}
            onChange={(value: ComboboxDataType | null) => {
              setSelected(value);
            }}
          />
          {errors.level && (
            <p className={"startup-form_error"}>{errors.level}</p>
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
export default TeacherForm;
