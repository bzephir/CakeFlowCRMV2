export enum OutsideFoodRules {
  ALLOWED = 'allowed',
  NOT_ALLOWED = 'not_allowed',
  NOTES = 'notes'
}

export interface Venue {
  id: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  capacity: number;
  deliveryNotes: string;
  coiRequired: boolean;
  outsideFoodRules: OutsideFoodRules;
  outsideFoodNotes?: string;
  tags: string[];
  additionalNotes: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface VenueFormData {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  capacity: number;
  deliveryNotes: string;
  coiRequired: boolean;
  outsideFoodRules: OutsideFoodRules;
  outsideFoodNotes: string;
  tags: string[];
  additionalNotes: string;
}