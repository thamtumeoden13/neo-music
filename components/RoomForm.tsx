"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formRoomSchema } from "@/lib/validation";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createRoom, updateRoom } from "@/lib/actions";
import { Room } from "@/sanity/types";

export type RoomFormProps = Pick<Room, "name" | "capacity" | "description">;

const RoomForm = ({ room }: { room?: Room }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Room | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formDataSubmit: FormData) => {
    try {
      const formValues: RoomFormProps = {
        name: formDataSubmit.get("name") as string,
        description: formDataSubmit.get("description") as string,
        capacity: Number(formDataSubmit.get("capacity") || 0),
      };

      await formRoomSchema.parseAsync(formValues);

      console.log("handleFormSubmit", formValues);

      const response = room
        ? await updateRoom(prevState, formValues, formData!._id)
        : await createRoom(prevState, formValues);

      if (response.status === "SUCCESS") {
        toast({
          title: "Success",
          description: `Your Room has been ${room ? "updated" : "created"} successfully`,
        });
      }

      router.push(`/admin/quan-ly-phong-hoc`);

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
    if (room) {
      const { _id, name, capacity, description } = room;

      setFormData({ ...formData!, _id, name, capacity, description });
    }
  }, [room]);

  return (
    <form action={formAction} className={"startup-form !max-w-5xl"}>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <div>
          <label htmlFor="name" className={"startup-form_label"}>
            {"Tên Phòng"}
          </label>
          <Input
            id={"name"}
            name={"name"}
            value={formData?.name}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            required
            placeholder={"Tên phòng học"}
          />
          {errors.name && <p className={"startup-form_error"}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="capacity" className={"startup-form_label "}>
            {"Sức chứa"}
          </label>
          <Input
            id={"capacity"}
            name={"capacity"}
            className={"startup-form_input"}
            placeholder={"Số học viên tối đa"}
            required
            type="number"
            min={0}
            value={formData?.capacity}
            onChange={handleChangeForm}
          />
          {errors.capacity && (
            <p className={"startup-form_error"}>{errors.capacity}</p>
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
            placeholder={"Mô tả chi tiết về phòng học"}
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
export default RoomForm;
