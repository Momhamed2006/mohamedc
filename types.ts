export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  image: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  date: string; // ISO date string or YYYY-MM-DD HH:mm
  reason?: string;
  status: AppointmentStatus;
  createdAt: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ClinicStats {
  totalAppointments: number;
  pending: number;
  completed: number;
}