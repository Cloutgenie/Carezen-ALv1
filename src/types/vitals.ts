export interface VitalRecord {
  id: string;
  residentId: string;
  residentName: string;
  timestamp: string;
  type: 'blood-pressure' | 'heart-rate' | 'temperature' | 'blood-sugar' | 'weight' | 'oxygen';
  value: string;
  unit: string;
  recordedBy: {
    id: string;
    name: string;
    role: string;
  };
  notes?: string;
  status: 'normal' | 'attention' | 'critical';
}

export interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'incident' | 'custom';
  dateRange: {
    start: string;
    end: string;
  };
  status: 'draft' | 'completed' | 'archived';
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  createdAt: string;
  lastModified: string;
  sections: {
    title: string;
    content: string;
  }[];
  tags: string[];
}

export interface VitalsFilters {
  type?: string;
  status?: string;
  resident?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}