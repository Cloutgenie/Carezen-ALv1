import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { VitalRecord } from '../../types/vitals';

interface Props {
  data: VitalRecord[];
  type: string;
}

const VitalsChart: React.FC<Props> = ({ data, type }) => {
  const formatData = (records: VitalRecord[]) => {
    return records.map((record) => ({
      time: new Date(record.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      value: record.type === 'blood-pressure'
        ? parseInt(record.value.split('/')[0])
        : parseFloat(record.value),
      status: record.status,
    }));
  };

  const getYAxisLabel = () => {
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

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formatData(data)}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            label={{
              value: getYAxisLabel(),
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              padding: '0.5rem',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name={type.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalsChart;