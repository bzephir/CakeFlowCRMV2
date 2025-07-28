// src/data/clientInfo.ts

export interface ClientInfo {
  firstName: string;
  lastName: string;
  fullName: string;
}

export const clientDataByFormId: Record<string, ClientInfo> = {
  "standard-cake-contract-001": {
    firstName: "Michael",
    lastName: "Chen",
    fullName: "Michael Chen",
  },
  // Add other clients keyed by form IDs here
};
