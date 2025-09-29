// src/data/adminInfo.ts

export interface AdminInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  // Add other admin/owner related fields if needed
}

export const adminInfo: AdminInfo = {
  firstName: "Sara",
  lastName: "Warsaw",
  fullName: "Sara Warsaw",
};