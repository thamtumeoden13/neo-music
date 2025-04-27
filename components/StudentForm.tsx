"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formStudentSchema } from "@/lib/validation";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createStudent, updateStudent } from "@/lib/actions";
import { Student } from "@/sanity/types";

export type StudentFormProps = Pick<
  Student,
  "name" | "contact" | "dob" | "parentName" | "parentContact" | "notes"
>;

const StudentForm = ({ student }: { student?: Student }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Student | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formDataSubmit: FormData) => {
    try {
      const formValues: StudentFormProps = {
        name: formDataSubmit.get("name") as string,
        contact: formDataSubmit.get("contact") as string,
        dob: formDataSubmit.get("dob") as string,
        parentName: formDataSubmit.get("parentName") as string,
        parentContact: formDataSubmit.get("parentContact") as string,
        notes: formDataSubmit.get("notes") as string,
      };

      await formStudentSchema.parseAsync(formValues);

      console.log("handleFormSubmit", formValues);

      const response = student
        ? await updateStudent(prevState, formValues, formData!._id)
        : await createStudent(prevState, formValues);

      if (response.status === "SUCCESS") {
        toast({
          title: "Success",
          description: `Your Student has been ${student ? "updated" : "created"} successfully`,
        });
      }

      router.push(`/admin/ho-so-hoc-vien`);

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
    if (student) {
      const { _id, name, contact, dob, parentName, parentContact, notes } =
        student;

      setFormData({
        ...formData!,
        _id,
        name,
        contact,
        dob,
        parentName,
        parentContact,
        notes,
      });
    }
  }, [student]);

  return (
    <form action={formAction} className={"startup-form !max-w-5xl"}>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <div>
          <label htmlFor="name" className={"startup-form_label"}>
            {"Họ và tên"}
          </label>
          <Input
            id={"name"}
            name={"name"}
            value={formData?.name}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            required
            placeholder={"Họ và tên"}
          />
          {errors.name && <p className={"startup-form_error"}>{errors.name}</p>}
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
          <label htmlFor="dob" className={"startup-form_label"}>
            {"Ngày sinh"}
          </label>
          <Input
            id={"dob"}
            name={"dob"}
            value={formData?.dob}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            placeholder={"Ngày sinh"}
          />
          {errors.dob && <p className={"startup-form_error"}>{errors.dob}</p>}
        </div>
        <div>
          <label htmlFor="parentName" className={"startup-form_label"}>
            {"Tên phụ huynh"}
          </label>
          <Input
            id={"parentName"}
            name={"parentName"}
            value={formData?.parentName}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            placeholder={"Đối với học viên nhỏ tuổi"}
          />
          {errors.parentName && <p className={"startup-form_error"}>{errors.parentName}</p>}
        </div>
        <div>
          <label htmlFor="parentContact" className={"startup-form_label"}>
            {"Liên hệ phụ huynh"}
          </label>
          <Input
            id={"parentContact"}
            name={"parentContact"}
            value={formData?.parentContact}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            placeholder={"Số điện thoại hoặc email của phụ huynh"}
          />
          {errors.parentContact && <p className={"startup-form_error"}>{errors.parentContact}</p>}
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
            placeholder={"Thông tin bổ sung về học viên"}
            onChange={handleChangeForm}
          />
          {errors.notes && (
            <p className={"startup-form_error"}>{errors.notes}</p>
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
export default StudentForm;
