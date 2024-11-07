export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'nurse' | 'caregiver';
  avatar?: string;
  department?: string;
  phone?: string;
  lastActive?: Date;
}

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ComponentType;
}