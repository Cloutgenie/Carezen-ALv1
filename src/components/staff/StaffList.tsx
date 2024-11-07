import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import type { Staff } from '../../types/staff';

const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'nurse',
    email: 'sarah.j@carezen.com',
    phone: '(555) 123-4567',
    department: 'Medical',
    startDate: '2023-01-15',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    certification: ['RN', 'BLS'],
    schedule: {
      shift: 'morning',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'caregiver',
    email: 'michael.c@carezen.com',
    phone: '(555) 234-5678',
    department: 'Residential Care',
    startDate: '2023-03-20',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    schedule: {
      shift: 'afternoon',
      days: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  },
];

const StaffList: React.FC = () => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockStaff.map((person) => (
        <li
          key={person.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-md"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{person.name}</h3>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {person.status}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{person.role}</p>
            </div>
            <img
              className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
              src={person.avatar}
              alt=""
            />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Email
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${person.phone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StaffList;