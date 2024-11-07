export interface CarePlan {
  id: string;
  residentId: string;
  residentName: string;
  startDate: string;
  reviewDate: string;
  status: 'active' | 'pending-review' | 'archived';
  careLevel: 'independent' | 'minimal' | 'moderate' | 'extensive' | 'total';
  goals: {
    id: string;
    category: 'physical' | 'mental' | 'social' | 'emotional';
    description: string;
    status: 'in-progress' | 'achieved' | 'not-started';
    targetDate: string;
  }[];
  activities: {
    id: string;
    name: string;
    frequency: string;
    assignedTo: string[];
    notes: string;
  }[];
  medications: {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    instructions: string;
    startDate: string;
    endDate?: string;
  }[];
  dietaryRequirements: string[];
  specialInstructions: string[];
}

export interface CarePlanFilters {
  status?: string;
  careLevel?: string;
  reviewDue?: boolean;
}