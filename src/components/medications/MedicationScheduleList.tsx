import React from 'react';
import { Clock, Check, AlertCircle, User } from 'lucide-react';
import type { MedicationSchedule } from '../../types/medication';

const mockSchedules: MedicationSchedule[] = [
  {
    id: '1',
    residentId: '1',
    residentName: 'Eleanor Thompson',
    medicationId: 'm1',
    medicationName: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    timing: [
      {
        time: '08:00',
        taken: true,
        administeredBy: 'Sarah Johnson',
        administeredAt: '2024-03-17T08:05:00Z',
        notes: 'Taken with breakfast',
      },
    ],
    startDate: '2024-01-15',
    status: 'active',
    prescribedBy: 'Dr. Williams',
    lastRefill: '2024-03-01',
    nextRefill: '2024-04-01',
  },
  {
    id: '2',
    residentId: '2',
    residentName: 'George Martinez',
    medicationId: 'm2',
    medicationName: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    timing: [
      {
        time: '08:00',
        taken: true,
        administeredBy: 'Michael Chen',
        administeredAt: '2024-03-17T08:10:00Z',
      },
      {
        time: '20:00',
        taken: false,
      },
    ],
    startDate: '2024-02-01',
    status: 'active',
    prescribedBy: 'Dr. Chen',
    lastRefill: '2024-03-15',
    nextRefill: '2024-04-15',
  },
];

const statusColors = {
  active: 'bg-green-50 text-green-700 ring-green-600/20',
  completed: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  discontinued: 'bg-red-50 text-red-700 ring-red-600/20',
  'on-hold': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
};

const MedicationScheduleList: React.FC = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {mockSchedules.map((schedule) => (
        <div key={schedule.id} className="p-6 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {schedule.residentName}
                </h3>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    statusColors[schedule.status]
                  }`}
                >
                  {schedule.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {schedule.medicationName} - {schedule.dosage}
              </p>
            </div>
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              Administer
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-5 w-5 text-gray-400" />
              <span>Frequency: {schedule.frequency}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="h-5 w-5 text-gray-400" />
              <span>Dr. {schedule.prescribedBy}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <AlertCircle className="h-5 w-5 text-gray-400" />
              <span>Next Refill: {new Date(schedule.nextRefill).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Today's Schedule</h4>
            <div className="mt-2 flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                {schedule.timing.map((time) => (
                  <li key={time.time} className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            time.taken
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Check className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {time.time}
                          </p>
                          {time.taken && (
                            <p className="text-sm text-gray-500">
                              Given by {time.administeredBy}
                            </p>
                          )}
                        </div>
                      </div>
                      {time.notes && (
                        <span className="text-sm text-gray-500">{time.notes}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicationScheduleList;