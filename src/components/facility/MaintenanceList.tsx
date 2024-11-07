import React from 'react';
import { AlertTriangle, Clock, User } from 'lucide-react';
import type { MaintenanceRequest } from '../../types/facility';

const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    roomId: '101',
    title: 'Leaking Faucet',
    description: 'Bathroom sink faucet is continuously dripping',
    priority: 'medium',
    status: 'pending',
    requestedBy: 'Sarah Johnson',
    requestedAt: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    roomId: '203',
    title: 'AC Not Working',
    description: 'Air conditioning unit making loud noise and not cooling',
    priority: 'high',
    status: 'in-progress',
    requestedBy: 'Michael Chen',
    requestedAt: '2024-03-16T09:15:00Z',
    assignedTo: 'Bob Smith',
  },
];

const priorityColors = {
  low: 'bg-gray-50 text-gray-700 ring-gray-600/20',
  medium: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  high: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  urgent: 'bg-red-50 text-red-700 ring-red-600/20',
};

const MaintenanceList: React.FC = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <ul role="list" className="divide-y divide-gray-100">
        {mockRequests.map((request) => (
          <li
            key={request.id}
            className="flex items-center justify-between gap-x-6 p-5 hover:bg-gray-50"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {request.title}
                </p>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="truncate">Room {request.roomId}</p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">
                    <User className="inline-block h-3 w-3 mr-1" />
                    {request.requestedBy}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <div className="flex flex-col items-end gap-y-1">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    priorityColors[request.priority]
                  }`}
                >
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {request.priority}
                </span>
                <p className="flex items-center text-xs leading-5 text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(request.requestedAt).toLocaleDateString()}
                </p>
              </div>
              <button className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                View
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceList;