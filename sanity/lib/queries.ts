import exp from "constants";
import { defineQuery } from "next-sanity";

export const AUTHORS_BY_QUERY =
  defineQuery(`*[_type == "author" && !defined($search) || title match $search] | order(_createdAt desc) {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio,
    role
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio,
    role
  }
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio,
    role
}
`);

export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author->{
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);

export const CONSTRUCTIONS_BY_QUERY =
  defineQuery(`*[_type == "construction" && !defined($search) || title match $search || author->name match $search] | order(orderIndex asc, _createdAt desc) {
  _id, 
  title, 
  subtitle,
  slug,
  _createdAt,
  _updatedAt,
  author->{
    _id, name, image, bio
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
}`);

export const CONSTRUCTION_BY_ID_QUERY =
  defineQuery(`*[_type == "construction" && _id == $id][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
}`);

export const CONSTRUCTION_BY_SLUG_QUERY =
  defineQuery(`*[_type == "construction" && slug.current == $slug][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
}`);

export const DESIGNS_BY_QUERY =
  defineQuery(`*[_type == "design" && !defined($search) || title match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  subtitle,
  slug,
  _createdAt,
  _updatedAt,
  author->{
    _id, name, image, bio
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
}`);

export const DESIGN_BY_ID_QUERY =
  defineQuery(`*[_type == "design" && _id == $id][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
}`);

export const DESIGN_BY_SLUG_QUERY =
  defineQuery(`*[_type == "design" && slug.current == $slug][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
}`);

export const PROJECTS_BY_QUERY =
  defineQuery(`*[_type == "project" && !defined($search) || title match $search ] | order(orderIndex asc, _createdAt desc) {
  _id, 
  title, 
  subtitle,
  slug,
  _createdAt,
  _updatedAt,
  author->{
    _id, name, image, bio
  },
  construction[]->{
    _id, title, subtitle, description, image, thumbnail, slug
  },
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
  overview {
    investor,
    address,
    scale,
    function,
    expense,
    designTeam,
    designYear,
    estimatedTime
  },
  views,
}`);

export const PROJECT_BY_ID_QUERY =
  defineQuery(`*[_type == "project" && _id == $id][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  },
  construction[]->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
}`);

export const PROJECT_BY_SLUG_QUERY =
  defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  construction[]->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
}`);

export const PROJECT_BY_CONSTRUCTION_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && references(*[_type == "construction" && slug.current in $slugs]._id)] | order(orderIndex asc, _createdAt desc) {
    _id, 
    title,
    subtitle,
    slug,
    _createdAt,
    author->{
      _id, name, username, image, bio
    }, 
    construction[]->{
      _id, title, subtitle, description, image, thumbnail, slug
    }, 
    views,
    description,
    image,
    thumbnail,
    pitch,
    orderIndex,
  }
`);

export const PROJECTS_BY_CONSTRUCTION_ID_QUERY = defineQuery(`
  *[_type == "project" && $id in construction[]._ref] | order(orderIndex asc, _createdAt desc) {
    _id, 
    title, 
    subtitle,
    slug,
    _createdAt,
    author->{
      _id, name, image, bio
    }, 
    construction[]->{
      _id, title, subtitle, description, image, thumbnail, slug
    }, 
    views,
    description,
    image,
    thumbnail,
    pitch,
    orderIndex,
  }
`);

export const PROJECTS_BY_DESIGN_ID_QUERY =
  defineQuery(`*[_type == "project" && design._ref == $id] | order(orderIndex asc, _createdAt desc) {
  _id, 
  title, 
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, image, bio
  }, 
  design->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
}`);

export const ALL_ARTICLES_BY_QUERY =
  defineQuery(`*[_type == "projectDetail" && !defined($search) || ( title match $search)] | order(orderIndex asc, _createdAt desc) {
  _id, 
  title, 
  subtitle,
  slug,
  _createdAt,
  _updatedAt,
  author->{
    _id, name, image, bio
  }, 
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  overview {
    investor,
    address,
    scale,
    function,
    expense,
    designTeam,
    designYear,
    estimatedTime
  },
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
  published,
}`);

export const PROJECT_DETAILS_BY_QUERY =
  defineQuery(`*[_type == "projectDetail" && !defined($search) || (project != null && title match $search)] | order(orderIndex asc, _createdAt desc) {
  _id, 
  title, 
  subtitle,
  slug,
  _createdAt,
  _updatedAt,
  author->{
    _id, name, image, bio
  }, 
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  overview {
    investor,
    address,
    scale,
    function,
    expense,
    designTeam,
    designYear,
    estimatedTime
  },
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
  published,
}`);

export const PROJECT_DETAIL_BY_ID_QUERY =
  defineQuery(`*[_type == "projectDetail" && _id == $id][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  },
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  },
  overview {
    investor,
    address,
    scale,
    function,
    expense,
    designTeam,
    designYear,
    estimatedTime
  },
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
  published,
}`);

export const PROJECT_DETAILS_BY_PROJECT_QUERY =
  defineQuery(`*[_type == "projectDetail" && project._ref == $id]| order(orderIndex asc, _createdAt desc) {
  _id,
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  },
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  overview {
    investor,
    address,
    scale,
    function,
    expense,
    designTeam,
    designYear,
    estimatedTime
  },
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
  published,
}`);

export const PROJECT_DETAIL_BY_SLUG_QUERY =
  defineQuery(`*[_type == "projectDetail" && slug.current == $slug][0]{
  _id, 
  title,
  subtitle,
  slug,
  tags,
  _createdAt,
  author->{
    _id, name, username, image, bio
  },
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  },
  overview {
    investor,
    address,
    scale,
    function,
    expense,
    designTeam,
    designYear,
    estimatedTime
  },
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
  published,
}`);

export const PROJECT_DETAILS_BY_TAG =
  defineQuery(`*[_type == "projectDetail" && defined($tag) && _id != $id && ($tag match tags || tags match $tag)] | order(orderIndex asc, _createdAt desc) {
  _id,
  title,
  subtitle,
  slug,
  tags,
  _createdAt,
  author->{
    _id, name, username, image, bio
  },
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  overview {
    investor,
    address,
    scale,
    function,
    expense,
    designTeam,
    designYear,
    estimatedTime
  },
  views,
  description,
  image,
  thumbnail,
  pitch,
  orderIndex,
  published,
}`);

export const PROJECT_DETAIL_VIEWS_QUERY = defineQuery(`
  *[_type == "projectDetail" && _id == $id][0]{
    _id,
    views
    }
  `);

export const CATEGORY_BY_SLUG_QUERY =
  defineQuery(`*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    subtitle,
    slug,
    description,
    image,
    thumbnail,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    project->{
      _id, title, subtitle, description, image, thumbnail, slug
    }, 
  }
}`);

export const CATEGORY_BY_ID_QUERY =
  defineQuery(`*[_type == "category" && _id == $id][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    _key,
    title,
    subtitle,
    slug,
    description,
    image,
    thumbnail,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    project->{
      _id, title, subtitle, description, image, thumbnail, slug
    }, 
  }
}`);

export const ROUTE_BY_SLUG_QUERY =
  defineQuery(`*[_type == "route" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    subtitle,
    slug,
    description,
    image,
    thumbnail,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    construction->{
      _id, title, subtitle, description, image, thumbnail, slug
    }, 
  }
}`);

export const ROUTE_BY_ID_QUERY =
  defineQuery(`*[_type == "route" && _id == $id][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    _key,
    title,
    subtitle,
    slug,
    description,
    image,
    thumbnail,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    construction->{
      _id, title, subtitle, description, image, thumbnail, slug
    }, 
  }
}`);

export const COURSES_BY_QUERY =
  defineQuery(`*[_type == "course" && !defined($search) || title match $search ] | order(orderIndex asc, _createdAt desc) {
  _id, 
  title, 
  level,
  description,
  _createdAt,
  _updatedAt,
}`);

export const COURSE_BY_ID_QUERY =
  defineQuery(`*[_type == "course" && _id == $id][0]{
  _id, 
  title,
  level,
  description,
  _createdAt,
  _updatedAt,
}`);

export const ROOMS_BY_QUERY =
  defineQuery(`*[_type == "room" && !defined($search) || name match $search ] | order(orderIndex asc, _createdAt desc) {
  _id,
  name,
  capacity,
  description,
  _createdAt,
  _updatedAt,
}`);

export const ROOM_BY_ID_QUERY =
  defineQuery(`*[_type == "room" && _id == $id][0]{
  _id,
  name,
  capacity,
  description,
  _createdAt,
  _updatedAt,
}`);

export const STUDENTS_BY_QUERY =
  defineQuery(`*[_type == "student" && !defined($search) || name match $search ] | order(orderIndex asc, _createdAt desc) {
  _id,
  name,
  contact,
  dob,
  parentName,
  parentContact,
  notes,
  _createdAt,
  _updatedAt,
}`);

export const STUDENT_BY_ID_QUERY =
  defineQuery(`*[_type == "student" && _id == $id][0]{
  _id,
  name,
  contact,
  dob,
  parentName,
  parentContact,
  notes,
  _createdAt,
  _updatedAt,
}`);

export const TEACHERS_BY_QUERY =
  defineQuery(`*[_type == "teacher" && !defined($search) || name match $search ] | order(orderIndex asc, _createdAt desc) {
  _id,
  name,
  contact,
  specialty,
  avatar,
  color,
  _createdAt,
  _updatedAt,
}`);

export const TEACHER_BY_ID_QUERY =
  defineQuery(`*[_type == "teacher" && _id == $id][0]{
  _id,
  name,
  contact,
  specialty,
  avatar,
  color,
  _createdAt,
  _updatedAt,
}`);

export const CLASS_SESSIONS_BY_QUERY =
  defineQuery(`*[_type == "classSession" && !defined($search) || title match $search ] | order(orderIndex asc, _createdAt desc) {
  _id,
  title,
  startDateTime,
  endDateTime,
  course->{
    _id, title
  },
  teacher->{
    _id, name
  },
  room->{
    _id, name
  },
  students[]->{
    _id, name
  },
  status,
  maxStudents,
  recurringRule,
  _createdAt,
  _updatedAt,
}`);

export const CLASS_SESSION_BY_ID_QUERY =
  defineQuery(`*[_type == "classSession" && _id == $id][0]{
  _id,
  title,
  startDateTime,
  endDateTime,
  course->{
    _id, title
  },
  teacher->{
    _id, name
  },
  room->{
    _id, name
  },
  students[]->{
    _id, name
  },
  status,
  maxStudents,
  recurringRule,
  _createdAt,
  _updatedAt,
}`);