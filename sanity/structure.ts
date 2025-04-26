import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("classSession").title("ClassSessions"),
      S.documentTypeListItem("course").title("Courses"),
      S.documentTypeListItem("room").title("Rooms"),
      S.documentTypeListItem("student").title("Students"),
      S.documentTypeListItem("teacher").title("Teachers"),
    ]);
