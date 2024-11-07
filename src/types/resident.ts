export interface Resident {
  id: string;
  name: string;
  roomNumber: string;
  dateOfBirth: string;
  admissionDate: string;
  status: 'active' | 'hospital' | 'temporary-leave' | 'discharged';
  careLevel: 'independent' | 'minimal' | 'moderate' | 'extensive' | 'total';
  primaryContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  medicalInfo: {
    allergies: string[];
    conditions: string[];
    primaryPhysician: string;
    dietaryRestrictions: string[];
  };
  avatar: string;
}

export interface ResidentFilters {
  status?: string;
  careLevel?: string;
  building?: string;
}