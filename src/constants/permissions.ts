import { UserRole } from "./roles";

export type Permission =
  | "pages:read"
  | "pages:write"
  | "pages:publish"
  | "pages:delete"
  | "blogs:read"
  | "blogs:write"
  | "blogs:publish"
  | "blogs:delete"
  | "media:read"
  | "media:write"
  | "media:delete"
  | "settings:read"
  | "settings:write"
  | "users:read"
  | "users:write"
  | "analytics:read"
  | "redirects:read"
  | "redirects:write"
  | "forms:read"
  | "forms:write";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPERADMIN: [
    "pages:read",
    "pages:write",
    "pages:publish",
    "pages:delete",
    "blogs:read",
    "blogs:write",
    "blogs:publish",
    "blogs:delete",
    "media:read",
    "media:write",
    "media:delete",
    "settings:read",
    "settings:write",
    "users:read",
    "users:write",
    "analytics:read",
    "redirects:read",
    "redirects:write",
    "forms:read",
    "forms:write",
  ],
  ADMIN: [
    "pages:read",
    "pages:write",
    "pages:publish",
    "pages:delete",
    "blogs:read",
    "blogs:write",
    "blogs:publish",
    "blogs:delete",
    "media:read",
    "media:write",
    "media:delete",
    "settings:read",
    "settings:write",
    "users:read",
    "analytics:read",
    "redirects:read",
    "redirects:write",
    "forms:read",
  ],
  EDITOR: [
    "pages:read",
    "pages:write",
    "pages:publish",
    "blogs:read",
    "blogs:write",
    "blogs:publish",
    "media:read",
    "media:write",
    "analytics:read",
    "redirects:read",
    "redirects:write",
  ],
  AUTHOR: [
    "pages:read",
    "blogs:read",
    "blogs:write",
    "media:read",
    "media:write",
  ],
  CONTRIBUTOR: [
    "pages:read",
    "blogs:read",
    "media:read",
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}
