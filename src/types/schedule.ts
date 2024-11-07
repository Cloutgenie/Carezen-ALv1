export interface ScheduleEvent {
  id: string;
  title: string;
  type: 'shift' | 'activity' | 'appointment' | 'maintenance';
  start: string;
  end: string;
  allDay?: boolean;
  location?: string;
  assignedTo: {
    id: string;
    name: string;
    role: string;
  }[];
  residents?: {
    id: string;
    name: string;
  }[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: string;
    daysOfWeek?: number[];
  };
}

export interface ScheduleFilters {
  type?: string;
  status?: string;
  assignedTo?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}