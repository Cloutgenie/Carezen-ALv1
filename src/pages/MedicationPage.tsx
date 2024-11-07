import React, { useState } from 'react';
import MedicationHeader from '../components/medications/MedicationHeader';
import MedicationFilters from '../components/medications/MedicationFilters';
import MedicationScheduleList from '../components/medications/MedicationScheduleList';
import type { MedicationFilters as MedicationFiltersType } from '../types/medication';

const MedicationPage: React.FC = () => {
  const [filters, setFilters] = useState<MedicationFiltersType>({});

  return (
    <div className="space-y-6">
      <MedicationHeader />
      <MedicationFilters filters={filters} onFilterChange={setFilters} />
      <MedicationScheduleList />
    </div>
  );
};

export default MedicationPage;