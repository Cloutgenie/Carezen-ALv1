export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite';
  status: 'occupied' | 'available' | 'maintenance' | 'cleaning';
  floor: number;
  building: string;
  occupants?: string[];
  amenities: string[];
  lastCleaned?: string;
}

export interface MaintenanceRequest {
  id: string;
  roomId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  requestedBy: string;
  requestedAt: string;
  assignedTo?: string;
  completedAt?: string;
}

export interface FacilityFilters {
  building?: string;
  floor?: number;
  status?: string;
  type?: string;
}