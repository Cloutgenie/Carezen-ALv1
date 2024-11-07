import React from 'react';
import { Users, Bed, Tool, Check } from 'lucide-react';
import type { Room } from '../../types/facility';

const mockRooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'single',
    status: 'occupied',
    floor: 1,
    building: 'A',
    occupants: ['John Doe'],
    amenities: ['Private Bathroom', 'Window View', 'TV'],
    lastCleaned: '2024-03-15',
  },
  {
    id: '2',
    number: '102',
    type: 'double',
    status: 'available',
    floor: 1,
    building: 'A',
    amenities: ['Shared Bathroom', 'Window View', 'TV'],
    lastCleaned: '2024-03-16',
  },
];

const statusColors = {
  occupied: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  available: 'bg-green-50 text-green-700 ring-green-600/20',
  maintenance: 'bg-red-50 text-red-700 ring-red-600/20',
  cleaning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
};

const RoomGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockRooms.map((room) => (
        <div
          key={room.id}
          className="relative flex flex-col bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Bed className="h-5 w-5 text-gray-400" />
              <span className="text-lg font-semibold">Room {room.number}</span>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                statusColors[room.status]
              }`}
            >
              {room.status}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center text-gray-500">
              <Users className="h-4 w-4 mr-2" />
              <span>
                {room.occupants?.length || 0}/{room.type === 'double' ? 2 : 1} Occupants
              </span>
            </div>

            <div className="flex items-center text-gray-500">
              <Tool className="h-4 w-4 mr-2" />
              <span>{room.amenities.join(', ')}</span>
            </div>

            {room.lastCleaned && (
              <div className="flex items-center text-gray-500">
                <Check className="h-4 w-4 mr-2" />
                <span>Last cleaned: {room.lastCleaned}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomGrid;