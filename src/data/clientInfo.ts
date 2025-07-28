// src/data/clientInfo.ts

export interface ClientInfo {
  firstName: string;
  lastName: string;
  fullName: string;
}

export const clientDataByFormId: Record<string, ClientInfo> = {
  "standard-cake-contract-001": {
    firstName: "Jane",
    lastName: "Smith",
    fullName: "Jane Smith",
  },
  // Add other clients keyed by form IDs here
};
