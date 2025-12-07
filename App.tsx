import React, { useState, useEffect } from 'react';
import { PatientFlow } from './views/PatientFlow';
import { DoctorDashboard } from './views/DoctorDashboard';
import { Doctor, Appointment, AppointmentStatus, ClinicStats } from './types';

// Mock Data
const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'dr-nadia',
    name: 'د. نادية العلمي',
    speciality: 'طبيبة نساء وتوليد',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dr-karim',
    name: 'د. كريم التازي',
    speciality: 'أخصائي جراحة أجنة',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  }
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: '101', patientName: 'سارة المنصور', patientPhone: '0661123456', doctorId: 'dr-nadia', date: new Date(Date.now() + 86400000).toISOString(), reason: 'متابعة حمل - الشهر الخامس', status: AppointmentStatus.PENDING, createdAt: new Date() },
  { id: '102', patientName: 'خديجة بنجلون', patientPhone: '0661987654', doctorId: 'dr-nadia', date: new Date(Date.now() + 172800000).toISOString(), reason: 'استشارة أولية', status: AppointmentStatus.PENDING, createdAt: new Date() },
  { id: '103', patientName: 'ليلى العمراني', patientPhone: '0661555555', doctorId: 'dr-nadia', date: new Date(Date.now() + 3600000).toISOString(), status: AppointmentStatus.CONFIRMED, createdAt: new Date() },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

function App() {
  // Simple view switcher for MVP Demo
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [stats, setStats] = useState<ClinicStats>({ totalAppointments: 0, pending: 0, completed: 0 });

  useEffect(() => {
    const total = appointments.length;
    const pending = appointments.filter(a => a.status === AppointmentStatus.PENDING).length;
    const completed = appointments.filter(a => a.status === AppointmentStatus.COMPLETED).length;
    setStats({ totalAppointments: total, pending, completed });
  }, [appointments]);

  const handleBookAppointment = (data: any) => {
    const newAppointment: Appointment = {
      id: generateId(),
      patientName: data.name,
      patientPhone: data.phone,
      doctorId: data.doctorId,
      date: data.date,
      reason: data.reason,
      status: AppointmentStatus.PENDING,
      createdAt: new Date()
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const handleUpdateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  // Easter egg to toggle admin: double click the logo/corner or use a button
  // For this demo, we'll put a discreet toggle at the bottom right
  
  if (isAdmin) {
    return (
      <>
        <DoctorDashboard 
          doctor={MOCK_DOCTORS[0]} 
          appointments={appointments}
          stats={stats}
          onUpdateStatus={handleUpdateStatus}
        />
        <button 
          onClick={() => setIsAdmin(false)} 
          className="fixed bottom-4 right-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-50 hover:opacity-100"
        >
          View Site
        </button>
      </>
    );
  }

  return (
    <>
      <PatientFlow 
        doctors={MOCK_DOCTORS}
        onBookAppointment={handleBookAppointment}
      />
      <button 
        onClick={() => setIsAdmin(true)} 
        className="fixed bottom-4 left-4 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded opacity-30 hover:opacity-100 z-50"
      >
        Clinic Login
      </button>
    </>
  );
}

export default App;