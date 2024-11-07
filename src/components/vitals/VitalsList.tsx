import React from 'react';
import { Activity, Clock, User, AlertTriangle } from 'lucide-react';
import type { VitalRecord } from '../../types/vitals';

interface Props {
  data: VitalRecord[];
}

const typeIcons = {
  'blood-pressure': Activity,
  'heart-rate': Activity,
  temperature: Activity,
  'blood-sugar': Activity,
  weight: Activity,
  oxygen: Activity,
};

const statusColors = {
  normal: 'bg-green-50 text-green-700 ring-green-600/20',
  attention: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  critical: 'bg-red-50 text-red-700 ring-red-600/20',
};

const VitalsList: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {data.map((vital) => {
        const Icon = typeIcons[vital.type];
        return (
          <div key={vital.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    statusColors[vital.status].split(' ')[0]
                  }`}
                >
                  <Icon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{vital.residentName}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {vital.type.replace('-', ' ').toUpperCase()}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        statusColors[vital.status]
                      }`}
                    >
                      {vital.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {vital.value} {vital.unit}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-5 w-5 text-gray-400" />
                <span>
                  {new Date(vital.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="h-5 w-5 text-gray-400" />
                <span>
                  Recorded by {vital.recordedBy.name}
                </span>
              </div>
              {vital.notes && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                  <span>{vital.notes}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VitalsList;