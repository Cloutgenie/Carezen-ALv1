import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import StaffPage from './pages/StaffPage';
import FacilityPage from './pages/FacilityPage';
import ResidentPage from './pages/ResidentPage';
import CarePlanPage from './pages/CarePlanPage';
import MedicationPage from './pages/MedicationPage';
import SchedulePage from './pages/SchedulePage';
import VitalsPage from './pages/VitalsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:pl-72">
          <Header />
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<ResidentPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/facility" element={<FacilityPage />} />
                <Route path="/residents" element={<ResidentPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/care-plans" element={<CarePlanPage />} />
                <Route path="/medications" element={<MedicationPage />} />
                <Route path="/vitals" element={<VitalsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;