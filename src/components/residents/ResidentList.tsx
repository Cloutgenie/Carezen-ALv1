import React from 'react';
import { Phone, Mail, CalendarDays, Activity } from 'lucide-react';
import type { Resident } from '../../types/resident';

const mockResidents: Resident[] = [
  {
    id: '1',
    name: 'Eleanor Thompson',
    roomNumber: '101',
    dateOfBirth: '1945-06-15',
    admissionDate: '2023-01-10',
    status: 'active',
    careLevel: 'moderate',
    primaryContact: {
      name: 'Robert Thompson',
      relationship: 'Son',
      phone: '(555) 123-4567',
      email: 'robert.t@email.com',
    },
    medicalInfo: {
      allergies: ['Penicillin', 'Shellfish'],
      conditions: ['Hypertension', 'Diabetes'],
      primaryPhysician: 'Dr. Sarah Williams',
      dietaryRestrictions: ['Low Sodium', 'No Shellfish'],
    },
    avatar: 'https://images.unsplash.com/photo-1551727974-8af20a3322f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'George Martinez',
    roomNumber: '203',
    dateOfBirth: '1942-03-22',
    admissionDate: '2023-04-15',
    status: 'active',
    careLevel: 'minimal',
    primaryContact: {
      name: 'Maria Martinez',
      relationship: 'Daughter',
      phone: '(555) 234-5678',
      email: 'maria.m@email.com',
    },
    medicalInfo: {
      allergies: ['Sulfa'],
      conditions: ['Arthritis'],
      primaryPhysician: 'Dr. James Chen',
      dietaryRestrictions: ['Diabetic Diet'],
    },
    avatar: 'https://images.unsplash.com/photo-1569779213435-ba3167dde7cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const statusColors = {
  active: 'bg-green-50 text-green-700 ring-green-600/20',
  hospital: 'bg-red-50 text-red-700 ring-red-600/20',
  'temporary-leave': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  discharged: 'bg-gray-50 text-gray-700 ring-gray-600/20',
};

const careLevelColors = {
  independent: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  minimal: 'bg-green-50 text-green-700 ring-green-600/20',
  moderate: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  extensive: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  total: 'bg-red-50 text-red-700 ring-red-600/20',
};

const ResidentList: React.FC = () => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockResidents.map((resident) => (
        <li
          key={resident.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-md"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {resident.name}
                </h3>
                <span
                  className={`inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                    statusColors[resident.status]
                  }`}
                >
                  {resident.status}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                    careLevelColors[resident.careLevel]
                  }`}
                >
                  {resident.careLevel} care
                </span>
                <span className="text-sm text-gray-500">Room {resident.roomNumber}</span>
              </div>
            </div>
            <img
              className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
              src={resident.avatar}
              alt=""
            />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`tel:${resident.primaryContact.phone}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Contact
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <button
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => {}}
                >
                  <Activity className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Care Plan
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ResidentList;