import { Admin } from "../types";

export enum Keys {
  Read = "read",
  Update = "update",
  Create = "create",
  Delete = "delete",
}

const rolesActions = {
  SuperAdmin: {
    can: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  Editor: {
    can: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
  },
  Author: {
    can: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
  },
};

type Permission = "Read" | "Update" | "Create" | "Delete";

export const adminActions = (admin: Admin, permission: Permission): boolean => {
  const { role } = admin;
  const roleActions = rolesActions[role as string as keyof typeof rolesActions];
  if (roleActions) {
    return roleActions.can[Keys[permission]];
  }
  return false;
};
