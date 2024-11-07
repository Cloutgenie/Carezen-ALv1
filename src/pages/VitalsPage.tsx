import React, { useState } from 'react';
import VitalsHeader from '../components/vitals/VitalsHeader';
import VitalsFilters from '../components/vitals/VitalsFilters';
import VitalsList from '../components/vitals/VitalsList';
import VitalsChart from '../components/vitals/VitalsChart';
import VitalsStats from '../components/vitals/VitalsStats';
import ReportsList from '../components/vitals/ReportsList';
import RecordVitalsModal from '../components/vitals/RecordVitalsModal';
import type { VitalsFilters as VitalsFiltersType, VitalRecord } from '../types/vitals';

const mockVitals = [
  {
    id: '1',
    residentId: '1',
    residentName: 'Eleanor Thompson',
    timestamp: '2024-03-17T08:00:00Z',
    type: 'blood-pressure',
    value: '120/80',
    unit: 'mmHg',
    recordedBy: {
      id: '1',
      name: 'Sarah Johnson',
      role: 'nurse',
    },
    status: 'normal',
  },
  {
    id: '2',
    residentId: '1',
    residentName: 'Eleanor Thompson',
    timestamp: '2024-03-17T12:00:00Z',
    type: 'blood-pressure',
    value: '125/85',
    unit: 'mmHg',
    recordedBy: {
      id: '1',
      name: 'Sarah Johnson',
      role: 'nurse',
    },
    status: 'normal',
  },
  {
    id: '3',
    residentId: '1',
    residentName: 'Eleanor Thompson',
    timestamp: '2024-03-17T16:00:00Z',
    type: 'blood-pressure',
    value: '130/88',
    unit: 'mmHg',
    recordedBy: {
      id: '2',
      name: 'Michael Chen',
      role: 'nurse',
    },
    status: 'attention',
  },
];

const VitalsPage: React.FC = () => {
  const [filters, setFilters] = useState<VitalsFiltersType>({});
  const [selectedType, setSelectedType] = useState('blood-pressure');
  const [activeTab, setActiveTab] = useState<'vitals' | 'reports'>('vitals');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [vitals, setVitals] = useState<VitalRecord[]>(mockVitals);

  const handleRecordVitals = (record: Omit<VitalRecord, 'id'>) => {
    const newRecord: VitalRecord = {
      ...record,
      id: (vitals.length + 1).toString(),
    };
    setVitals([...vitals, newRecord]);
  };

  return (
    <div className="space-y-6">
      <VitalsHeader onRecordVitals={() => setIsRecordModalOpen(true)} />

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { name: 'Vital Signs', value: 'vitals' },
            { name: 'Reports', value: 'reports' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as 'vitals' | 'reports')}
              className={`
                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                ${
                  activeTab === tab.value
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'vitals' ? (
        <>
          <VitalsFilters filters={filters} onFilterChange={setFilters} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Vital Signs Trends</h3>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="blood-pressure">Blood Pressure</option>
                    <option value="heart-rate">Heart Rate</option>
                    <option value="temperature">Temperature</option>
                    <option value="blood-sugar">Blood Sugar</option>
                    <option value="weight">Weight</option>
                    <option value="oxygen">Oxygen Saturation</option>
                  </select>
                </div>
                <VitalsChart data={vitals} type={selectedType} />
              </div>

              <div className="mt-6">
                <VitalsStats data={vitals} type={selectedType} />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Readings</h3>
              <VitalsList data={vitals} />
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <ReportsList />
          </div>
        </div>
      )}

      <RecordVitalsModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        onSubmit={handleRecordVitals}
      />
    </div>
  );
};

export default VitalsPage;