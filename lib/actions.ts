"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { client, clientNoCache } from "@/sanity/lib/client";
import {
  CATEGORY_BY_ID_QUERY,
  CLASS_SESSION_BY_ID_QUERY,
  CONSTRUCTION_BY_SLUG_QUERY,
  DESIGN_BY_SLUG_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_DETAIL_BY_ID_QUERY,
  PROJECT_DETAIL_BY_SLUG_QUERY,
  ROUTE_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { v4 as uuidv4 } from "uuid";
import { Author, Course } from "@/sanity/types";
import { CourseFormProps } from "@/components/CourseForm";
import { RoomFormProps } from "@/components/RoomForm";
import { StudentFormProps } from "@/components/StudentForm";
import { TeacherFormProps } from "@/components/TeacherForm";
import {
  ClassSessionFormType,
  ClassSessionFormValues,
} from "@/components/ClassSessionForm";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createConstruction = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  console.log("createConstruction -> session", session);

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { _id, title, subtitle, description, thumbnail, image, orderIndex } =
    Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"));

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(CONSTRUCTION_BY_SLUG_QUERY, {
    slug: baseSlug,
  });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const construction = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      orderIndex,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({
      _type: "construction",
      ...construction,
    });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateConstruction = async (
  state: any,
  form: FormData,
  pitch: string,
  _id: string
) => {
  const session = await auth();

  console.log("updateConstruction -> session", session);

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, subtitle, description, thumbnail, image, orderIndex } =
    Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"));

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(CONSTRUCTION_BY_SLUG_QUERY, {
    slug: baseSlug,
  });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const construction = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      orderIndex,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient
      .patch(_id)
      .set({ ...construction })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createDesign = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  console.log("createDesign -> session", session);

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { _id, title, subtitle, description, thumbnail, image } =
    Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"));

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(DESIGN_BY_SLUG_QUERY, {
    slug: baseSlug,
  });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const design = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "design", ...design });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateDesign = async (
  state: any,
  form: FormData,
  pitch: string,
  _id: string
) => {
  const session = await auth();

  console.log("updateDesign -> session", session);

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(DESIGN_BY_SLUG_QUERY, {
    slug: baseSlug,
  });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const design = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient
      .patch(_id)
      .set({ ...design })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createProject = async (
  state: any,
  form: FormData,
  pitch: string,
  constructionIds: string[]
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, subtitle, description, thumbnail, image, orderIndex } =
    Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"));

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(PROJECT_BY_SLUG_QUERY, {
    slug: baseSlug,
  });

  console.log(resultQuery);

  const constructions = constructionIds?.map((_id: string) => ({
    _type: "reference",
    _ref: _id,
    _key: uuidv4(),
  }));

  console.log("updateProject -> constructions", constructions);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const projectData = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      orderIndex,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      construction: constructions,
      pitch,
    };

    const result = await writeClient.create({
      _type: "project",
      ...projectData,
    });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateProject = async (
  state: any,
  form: FormData,
  pitch: string,
  constructionIds: string[],
  _id: string
) => {
  console.log("updateProject-1");
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const {
    title,
    subtitle,
    description,
    thumbnail,
    image,
    orderIndex,
    investor,
    address,
    scale,
    _function,
    expense,
    designTeam,
    designYear,
    estimatedTime,
  } = Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"));

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(PROJECT_BY_SLUG_QUERY, {
    slug: baseSlug,
  });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  const constructions = constructionIds?.map((_id: string) => ({
    _type: "reference",
    _ref: _id,
    _key: uuidv4(),
  }));

  console.log("updateProject -> constructions", constructions);

  try {
    const projectData = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      orderIndex,
      overview: {
        investor,
        address,
        scale,
        function: _function,
        expense,
        designTeam,
        designYear,
        estimatedTime,
      },
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      construction: constructions,
      pitch,
    };

    console.log(projectData);

    const result = await writeClient
      .patch(_id)
      .set({ ...projectData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createProjectDetail = async (
  state: any,
  form: FormData,
  pitch: string,
  projectId: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const {
    title,
    subtitle,
    tags,
    description,
    thumbnail,
    image,
    orderIndex,
    overview,
  } = Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"));

  console.log("createProjectDetail -> overview", overview);

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(PROJECT_DETAIL_BY_SLUG_QUERY, {
    slug: baseSlug,
  });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const projectDetailData = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      tags,
      orderIndex,
      overview,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      project: {
        _type: "reference",
        _ref: projectId,
      },
      pitch,
    };

    const result = await writeClient.create({
      _type: "projectDetail",
      ...projectDetailData,
    });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateProjectDetail = async (form: FormData, _id: string) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const {
    title,
    subtitle,
    tags,
    description,
    thumbnail,
    image,
    orderIndex,
    investor,
    address,
    scale,
    _function,
    expense,
    designTeam,
    designYear,
    estimatedTime,
  } = Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"));

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(PROJECT_DETAIL_BY_SLUG_QUERY, {
    slug: baseSlug,
  });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const projectDetailData = {
      title,
      subtitle,
      description,
      tags,
      thumbnail,
      image,
      orderIndex,
      overview: {
        investor,
        address,
        scale,
        function: _function,
        expense,
        designTeam,
        designYear,
        estimatedTime,
      },
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      project: {
        _type: "reference",
        _ref: projectId,
      },
      pitch,
    };

    const result = await writeClient
      .patch(_id)
      .set({ ...projectDetailData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateCategory = async (
  state: any,
  _id: string,
  projectId: string,
  isDelete: boolean = false
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { select } = await clientNoCache.fetch(CATEGORY_BY_ID_QUERY, {
    id: _id,
  });

  console.log(select);

  try {
    if (isDelete) {
      const categorySelect = select
        .filter((item: any) => item._id !== projectId)
        .map((item: any) => ({
          _type: "reference",
          _ref: item._id,
          _key: item._key || uuidv4(),
        }));
      const categoryData = {
        select: [...categorySelect],
      };

      const result = await writeClient
        .patch(_id)
        .set({ ...categoryData })
        .commit();

      return parseServerActionResponse({
        result,
        error: "",
        status: "SUCCESS",
      });
    }

    const isExist = select.find((item: any) => item._id === projectId);

    if (isExist) {
      return parseServerActionResponse({
        error: "This item is already exist",
        status: "ERROR",
      });
    }

    const categorySelect = select.map((item: any) => ({
      _type: "reference",
      _ref: item._id,
      _key: item._key || uuidv4(),
    }));
    const categoryData = {
      select: [
        ...categorySelect,
        { _type: "reference", _ref: projectId, _key: uuidv4() },
      ],
    };

    const result = await writeClient
      .patch(_id)
      .set({ ...categoryData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateRoute = async (
  state: any,
  _id: string,
  projectId: string,
  isDelete: boolean = false
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { select } = await clientNoCache.fetch(ROUTE_BY_ID_QUERY, { id: _id });

  console.log(select);

  try {
    if (isDelete) {
      const routeSelect = select
        .filter((item: any) => item._id !== projectId)
        .map((item: any) => ({
          _type: "reference",
          _ref: item._id,
          _key: item._key || uuidv4(),
        }));
      const routeData = {
        select: [...routeSelect],
      };

      const result = await writeClient
        .patch(_id)
        .set({ ...routeData })
        .commit();

      return parseServerActionResponse({
        result,
        error: "",
        status: "SUCCESS",
      });
    }

    const isExist = select.find((item: any) => item._id === projectId);

    if (isExist) {
      return parseServerActionResponse({
        error: "This item is already exist",
        status: "ERROR",
      });
    }

    const routeSelect = select.map((item: any) => ({
      _type: "reference",
      _ref: item._id,
      _key: item._key || uuidv4(),
    }));
    const routeData = {
      select: [
        ...routeSelect,
        { _type: "reference", _ref: projectId, _key: uuidv4() },
      ],
    };

    const result = await writeClient
      .patch(_id)
      .set({ ...routeData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const deleteById = async (_id: string) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    const result = await writeClient.delete(_id);

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateRoleByAdmin = async (post: Author) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    const result = await writeClient
      .patch(post._id)
      .set({ ...post })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const publishedProjectDetail = async (
  postId: string,
  published: string
): Promise<ReturnType<typeof parseServerActionResponse>> => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const resultQuery = await clientNoCache.fetch(PROJECT_DETAIL_BY_ID_QUERY, {
    id: postId,
  });

  try {
    const projectDetailData = {
      ...resultQuery,
      published,
    };
    const result = await writeClient
      .patch(postId)
      .set({ ...projectDetailData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createCourse = async (_state: any, form: CourseFormProps) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, level, description } = form;
  try {
    const courseData = {
      title,
      level,
      description,
    };

    console.log(courseData);

    const result = await writeClient.create({ _type: "course", ...courseData });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateCourse = async (
  state: any,
  form: CourseFormProps,
  _id: string
) => {
  console.log("updateCourse-1");
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, level, description } = form;

  try {
    const courseData = {
      title,
      level,
      description,
    };

    console.log(courseData);

    const result = await writeClient
      .patch(_id)
      .set({ ...courseData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createRoom = async (_state: any, form: RoomFormProps) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { name, capacity, description } = form;
  try {
    const roomData = {
      name,
      capacity,
      description,
    };

    console.log(roomData);

    const result = await writeClient.create({ _type: "room", ...roomData });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateRoom = async (
  state: any,
  form: RoomFormProps,
  _id: string
) => {
  console.log("updateRoom-1");
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { name, capacity, description } = form;

  try {
    const roomData = {
      name,
      capacity,
      description,
    };

    console.log(roomData);

    const result = await writeClient
      .patch(_id)
      .set({ ...roomData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createStudent = async (_state: any, form: StudentFormProps) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { name, contact, dob, parentName, parentContact, notes } = form;
  try {
    const studentData = {
      name,
      contact,
      dob,
      parentName,
      parentContact,
      notes,
    };

    console.log(studentData);

    const result = await writeClient.create({
      _type: "student",
      ...studentData,
    });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateStudent = async (
  state: any,
  form: StudentFormProps,
  _id: string
) => {
  console.log("updateRoom-1");
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { name, contact, dob, parentName, parentContact, notes } = form;
  try {
    const studentData = {
      name,
      contact,
      dob,
      parentName,
      parentContact,
      notes,
    };

    console.log(studentData);

    const result = await writeClient
      .patch(_id)
      .set({ ...studentData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createTeacher = async (_state: any, form: TeacherFormProps) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { name, contact, specialty, avatar, color } = form;
  try {
    const studentData = {
      name,
      contact,
      specialty,
      avatar,
      color,
    };

    console.log(studentData);

    const result = await writeClient.create({
      _type: "teacher",
      ...studentData,
    });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateTeacher = async (
  state: any,
  form: TeacherFormProps,
  _id: string
) => {
  console.log("updateRoom-1");
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { name, contact, specialty, avatar, color } = form;
  try {
    const studentData = {
      name,
      contact,
      specialty,
      avatar,
      color,
    };

    console.log(studentData);

    const result = await writeClient
      .patch(_id)
      .set({ ...studentData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createClassSession = async (form: ClassSessionFormValues) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const {
    title,
    maxStudents,
    notes,
    startDateTime,
    endDateTime,
    status,
    course,
    teacher,
    room,
    students,
  } = form;

  const studentRefs = students?.map((student) => ({
    _type: "reference",
    _ref: student,
    _key: uuidv4(),
  }));

  try {
    const classSessionData = {
      title,
      maxStudents,
      notes,
      startDateTime,
      endDateTime,
      status,
      course: {
        _type: "reference",
        _ref: course,
      },
      teacher: {
        _type: "reference",
        _ref: teacher,
      },
      room: {
        _type: "reference",
        _ref: room,
      },
      students: studentRefs,
    };

    const result = await writeClient.create({
      _type: "classSession",
      ...classSessionData,
    });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateClassSession = async (
  form: ClassSessionFormValues,
  _id: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const {
    title,
    maxStudents,
    notes,
    startDateTime,
    endDateTime,
    status,
    course,
    teacher,
    room,
    students,
  } = form;

  const studentRefs = students?.map((student) => ({
    _type: "reference",
    _ref: student,
    _key: uuidv4(),
  }));

  try {
    const classSessionData = {
      title,
      maxStudents,
      notes,
      startDateTime,
      endDateTime,
      status,
      course: {
        _type: "reference",
        _ref: course,
      },
      teacher: {
        _type: "reference",
        _ref: teacher,
      },
      room: {
        _type: "reference",
        _ref: room,
      },
      students: studentRefs,
    };
    const result = await writeClient
      .patch(_id)
      .set({ ...classSessionData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const publishedClassSession = async (
  classSessionId: string,
  status: string
): Promise<ReturnType<typeof parseServerActionResponse>> => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const resultQuery = await clientNoCache.fetch(CLASS_SESSION_BY_ID_QUERY, {
    id: classSessionId,
  });

  try {
    const classSessionData = {
      ...resultQuery,
      status,
    };
    const result = await writeClient
      .patch(classSessionId)
      .set({ ...classSessionData })
      .commit();

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
