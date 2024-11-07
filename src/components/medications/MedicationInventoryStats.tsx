import React from 'react';
import { Package, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import type { Medication } from '../../types/medication';

interface Props {
  medications: Medication[];
}

const MedicationInventoryStats: React.FC<Props> = ({ medications }) => {
  const getTotalStock = () => {
    return medications.reduce((acc, med) => acc + med.stock, 0);
  };

  const getLowStockCount = () => {
    return medications.filter((med) => med.stock <= med.reorderPoint).length;
  };

  const getUpcomingRefills = () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return medications.filter((med) => {
      const refillDate = new Date(med.nextRefill);
      return refillDate >= today && refillDate <= thirtyDaysFromNow;
    }).length;
  };

  const getStockValue = () => {
    // This would typically involve a price per unit calculation
    // Using a mock calculation for demonstration
    return medications.reduce((acc, med) => acc + (med.stock * 10), 0);
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Inventory
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {getTotalStock()}
                  </div>
                  <div className="ml-2 text-sm text-gray-500">units</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Low Stock Items
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {getLowStockCount()}
                  </div>
                  <div className="ml-2 text-sm text-gray-500">medications</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Upcoming Refills
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {getUpcomingRefills()}
                  </div>
                  <div className="ml-2 text-sm text-gray-500">in 30 days</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Inventory Value
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    ${getStockValue().toLocaleString()}
                  </div>
                  <div className="ml-2 text-sm text-gray-500">estimated</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationInventoryStats;