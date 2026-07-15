export type UserRole = "SUPERADMIN" | "ADMIN" | "EDITOR" | "AUTHOR" | "CONTRIBUTOR";

export const ROLES: Record<UserRole, string> = {
  SUPERADMIN: "Super Administrator",
  ADMIN: "Administrator",
  EDITOR: "Editor",
  AUTHOR: "Author",
  CONTRIBUTOR: "Contributor",
};
