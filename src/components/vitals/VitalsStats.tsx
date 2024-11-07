import React from 'react';
import { ArrowUp, ArrowDown, Minus, Activity, AlertCircle, Clock } from 'lucide-react';
import type { VitalRecord } from '../../types/vitals';

interface Props {
  data: VitalRecord[];
  type: string;
}

const VitalsStats: React.FC<Props> = ({ data, type }) => {
  const getLatestReading = () => {
    if (data.length === 0) return null;
    return data[data.length - 1];
  };

  const getAverageReading = () => {
    if (data.length === 0) return null;
    const sum = data.reduce((acc, curr) => {
      const value = type === 'blood-pressure' 
        ? parseInt(curr.value.split('/')[0])
        : parseFloat(curr.value);
      return acc + value;
    }, 0);
    return (sum / data.length).toFixed(1);
  };

  const getChange = () => {
    if (data.length < 2) return null;
    const latest = type === 'blood-pressure'
      ? parseInt(data[data.length - 1].value.split('/')[0])
      : parseFloat(data[data.length - 1].value);
    const previous = type === 'blood-pressure'
      ? parseInt(data[data.length - 2].value.split('/')[0])
      : parseFloat(data[data.length - 2].value);
    return {
      value: ((latest - previous) / previous) * 100,
      direction: latest > previous ? 'up' : latest < previous ? 'down' : 'same',
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-700 bg-green-50 ring-green-600/20';
      case 'attention':
        return 'text-yellow-700 bg-yellow-50 ring-yellow-600/20';
      case 'critical':
        return 'text-red-700 bg-red-50 ring-red-600/20';
      default:
        return 'text-gray-700 bg-gray-50 ring-gray-600/20';
    }
  };

  const getUnit = () => {
    switch (type) {
      case 'blood-pressure':
        return 'mmHg';
      case 'heart-rate':
        return 'BPM';
      case 'temperature':
        return '°F';
      case 'blood-sugar':
        return 'mg/dL';
      case 'weight':
        return 'lbs';
      case 'oxygen':
        return '%';
      default:
        return '';
    }
  };

  const latest = getLatestReading();
  const average = getAverageReading();
  const change = getChange();

  if (!latest) return null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Latest Reading</p>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {latest.value} {getUnit()}
              </p>
              {change && (
                <span className="ml-2 text-sm">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      change.direction === 'up'
                        ? 'text-red-700 bg-red-50 ring-red-600/20'
                        : change.direction === 'down'
                        ? 'text-green-700 bg-green-50 ring-green-600/20'
                        : 'text-gray-700 bg-gray-50 ring-gray-600/20'
                    }`}
                  >
                    {change.direction === 'up' ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : change.direction === 'down' ? (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    ) : (
                      <Minus className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(change.value).toFixed(1)}%
                  </span>
                </span>
              )}
            </div>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(
              latest.status
            )}`}
          >
            {latest.status}
          </span>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{new Date(latest.timestamp).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Activity className="h-4 w-4" />
            <span>Recorded by {latest.recordedBy.name}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm font-medium text-gray-500">Daily Average</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {average} {getUnit()}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle className="h-4 w-4" />
            <span>Based on {data.length} readings</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm font-medium text-gray-500">Status Distribution</p>
          <div className="mt-2 space-y-2">
            {['normal', 'attention', 'critical'].map((status) => {
              const count = data.filter((record) => record.status === status).length;
              const percentage = ((count / data.length) * 100).toFixed(0);
              return (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">{status}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${
                          status === 'normal'
                            ? 'bg-green-500'
                            : status === 'attention'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalsStats;