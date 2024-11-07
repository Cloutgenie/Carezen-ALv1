import React, { useState } from 'react';
import CarePlanHeader from '../components/care-plans/CarePlanHeader';
import CarePlanFilters from '../components/care-plans/CarePlanFilters';
import CarePlanList from '../components/care-plans/CarePlanList';
import type { CarePlanFilters as CarePlanFiltersType } from '../types/carePlan';

const CarePlanPage: React.FC = () => {
  const [filters, setFilters] = useState<CarePlanFiltersType>({});

  return (
    <div className="space-y-6">
      <CarePlanHeader />
      <CarePlanFilters filters={filters} onFilterChange={setFilters} />
      <CarePlanList />
    </div>
  );
};

export default CarePlanPage;