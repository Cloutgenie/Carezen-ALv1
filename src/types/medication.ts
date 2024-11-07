export interface Medication {
  id: string;
  name: string;
  type: 'pill' | 'liquid' | 'injection' | 'topical' | 'other';
  strength: string;
  unit: 'mg' | 'ml' | 'g' | 'mcg' | 'IU';
  instructions: string;
  sideEffects: string[];
  interactions: string[];
  stock: number;
  reorderPoint: number;
  supplier: string;
  lastRefill: string;
  nextRefill: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';
}

export interface MedicationSchedule {
  id: string;
  residentId: string;
  residentName: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  timing: {
    time: string;
    taken: boolean;
    administeredBy?: string;
    administeredAt?: string;
    notes?: string;
  }[];
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'discontinued' | 'on-hold';
  prescribedBy: string;
  lastRefill: string;
  nextRefill: string;
}

export interface MedicationFilters {
  status?: string;
  type?: string;
  stock?: string;
}