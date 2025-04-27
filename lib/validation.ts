import z from "zod";
import { generateUniqueSlug } from "./utils";
import { client } from "@/sanity/lib/client";
import { CONSTRUCTION_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { Phone } from "lucide-react";
import {
  classSessionList,
  courseLevelList,
  displayColor,
  frequencyList,
} from "@/constants";

export const formSchema = z.object({
  title: z.string().min(3).max(1000),
  description: z.string().max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return !!contentType?.startsWith("image/");
      } catch (e) {
        return false;
      }
    }),
  pitch: z.string().min(10),
});

export const formConstructionSchema = z.object({
  title: z.string().min(5).max(100),
  subtitle: z.string().max(100),
  description: z.string().max(500),
  thumbnail: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return !!contentType?.startsWith("image/");
      } catch (e) {
        return false;
      }
    }),
  image: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return !!contentType?.startsWith("image/");
      } catch (e) {
        return false;
      }
    }),
  pitch: z.string().min(20),
});

export const formDesignSchema = z.object({
  title: z.string().min(5).max(100),
  subtitle: z.string().max(100),
  description: z.string().max(500),
  thumbnail: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return !!contentType?.startsWith("image/");
      } catch (e) {
        return false;
      }
    }),
  image: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return !!contentType?.startsWith("image/");
      } catch (e) {
        return false;
      }
    }),
  pitch: z.string().min(20),
});

export const formProjectSchema = z.object({
  title: z.string().min(5).max(100),
  subtitle: z.string().max(100),
  description: z.string().max(500),
  thumbnail: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return !!contentType?.startsWith("image/");
      } catch (e) {
        return false;
      }
    }),
  image: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return !!contentType?.startsWith("image/");
      } catch (e) {
        return false;
      }
    }),
  constructionIds: z.array(z.string()).min(1),
  pitch: z.string().min(20),
});

export const formProjectDetailSchema = z.object({
  title: z.string().min(5).max(100),
  subtitle: z.string().max(100),
  tags: z.string().max(100),
  description: z.string().max(500),
  thumbnail: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return !!contentType?.startsWith("image/");
      } catch (e) {
        return false;
      }
    }),
  image: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return !!contentType?.startsWith("image/");
      } catch (e) {
        return false;
      }
    }),
  projectId: z.string().min(10),
  pitch: z.string().min(20),
});

export const formContactSchema = z.object({
  name: z.string().min(3).max(1000),
  phone: z.string().min(10).max(15),
  email: z.string().email(),
  message: z.string().min(10),
});

export const formCourseSchema = z.object({
  title: z.string().min(5).max(100),
  level: z.string().refine((val) => {
    const levels = courseLevelList.map((item) => item.value);
    return levels.includes(val);
  }),
  description: z.string().max(500),
});

export const formRoomSchema = z.object({
  name: z.string().min(3).max(100),
  capacity: z.number().min(1).max(20),
  description: z.string().max(500),
});

export const formStudentSchema = z.object({
  name: z.string().min(3).max(100), // Name must be between 3 and 100 characters
  contact: z.string().min(10).max(15), // Contact must be between 10 and 15 characters
  dob: z.string().refine(
    (date) => {
      // Validate date format (e.g., YYYY-MM-DD)
      return /^\d{4}-\d{2}-\d{2}$/.test(date);
    },
    { message: "Invalid date format. Use YYYY-MM-DD." }
  ),
  parentName: z.string().max(100), // Parent's name must be between 3 and 100 characters
  parentContact: z.string().max(15), // Parent's contact must be between 10 and 15 characters
  notes: z.string().max(500).optional(), // Notes are optional but must not exceed 500 characters
});

export const formTeacherSchema = z.object({
  name: z.string().min(3).max(100), // Name must be between 3 and 100 characters
  contact: z.string().min(10).max(15), // Contact must be between 10 and 15 characters
  specialty: z.string().min(1).max(15),
  color: z.string().refine((val) => {
    const levels = displayColor.map((item) => item.value);
    return levels.includes(val);
  }),
});

export const formClassSessionSchema = z.object({
  title: z.string().min(3).max(1000),
  maxStudents: z.number().min(1).max(20),
  status: z.string().refine((val) => {
    const status = classSessionList.map((item) => item.value);
    return status.includes(val);
  }),
  notes: z.string().max(500).optional(),
  // recurringRule: z.object({
  //   frequency: z.string().refine((val) => {
  //     const frequencies = frequencyList.map((item) => item.value);
  //     return frequencies.includes(val);
  //   }),
  //   interval: z.number().min(1),
  //   endDate: z.string().optional(),
  //   occurrences: z.number().optional(),
  // }),
  course: z.string().min(1).max(100),
  room: z.string().min(1).max(100),
  teacher: z.string().min(1).max(100),
  students: z.array(z.string()),
  startDateTime: z.string().refine((val) => {
    // Validate date format (e.g., YYYY-MM-DD)
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(val);
  }),
  endDateTime: z.string().refine((val) => {
    // Validate date format (e.g., YYYY-MM-DD)
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(val);
  }),
});
