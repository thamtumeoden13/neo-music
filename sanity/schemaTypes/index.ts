import { type SchemaTypeDefinition } from "sanity";
import { author } from "@/sanity/schemaTypes/author";
import teacher from "./teacher";
import room from "@/sanity/schemaTypes/room";
import course from "@/sanity/schemaTypes/course";
import student from "@/sanity/schemaTypes/student";
import classSession from "@/sanity/schemaTypes/classSession";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    author,
    teacher,
    room,
    course,
    student,
    classSession,
  ],
};
