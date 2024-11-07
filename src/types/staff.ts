export interface Staff {
  id: string;
  name: string;
  role: 'admin' | 'nurse' | 'caregiver' | 'maintenance' | 'kitchen';
  email: string;
  phone: string;
  department: string;
  startDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  avatar: string;
  certification?: string[];
  schedule?: {
    shift: 'morning' | 'afternoon' | 'night';
    days: string[];
  };
}

export interface StaffFilters {
  role?: string;
  department?: string;
  status?: string;
}