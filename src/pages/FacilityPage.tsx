import React from 'react';
import FacilityHeader from '../components/facility/FacilityHeader';
import RoomGrid from '../components/facility/RoomGrid';
import MaintenanceList from '../components/facility/MaintenanceList';

const FacilityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <FacilityHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Rooms Overview</h3>
          <RoomGrid />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance Requests</h3>
          <MaintenanceList />
        </div>
      </div>
    </div>
  );
};

export default FacilityPage;