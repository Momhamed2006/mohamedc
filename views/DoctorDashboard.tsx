import React from 'react';
import { 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  CheckCircle, 
  XCircle,
  Clock,
  Phone,
  FileText,
  Search
} from 'lucide-react';
import { Button } from '../components/Button';
import { Appointment, AppointmentStatus, Doctor, ClinicStats } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DoctorDashboardProps {
  doctor: Doctor;
  appointments: Appointment[];
  stats: ClinicStats;
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ 
  doctor, 
  appointments, 
  stats,
  onUpdateStatus
}) => {
  const pendingAppointments = appointments.filter(a => a.status === AppointmentStatus.PENDING);
  const confirmedAppointments = appointments.filter(a => a.status === AppointmentStatus.CONFIRMED);
  
  // Data for the chart
  const chartData = [
    { name: 'جديدة', value: pendingAppointments.length, color: '#f43f5e' }, // rose-500
    { name: 'مؤكدة', value: confirmedAppointments.length, color: '#0ea5e9' }, // sky-500
    { name: 'مكتملة', value: stats.completed, color: '#10b981' }, // emerald-500
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="bg-white border-b md:border-b-0 md:border-l border-gray-200 w-full md:w-72 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-rose-200">
            CN
          </div>
          <div>
             <h1 className="font-bold text-gray-900">Clinique Naissance</h1>
             <p className="text-xs text-gray-500">لوحة الإدارة</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           <a href="#" className="flex items-center gap-3 px-4 py-3 bg-rose-50 text-rose-700 rounded-xl font-medium">
             <Calendar className="w-5 h-5" />
             الحجوزات
           </a>
           <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
             <Users className="w-5 h-5" />
             ملفات المرضى
           </a>
           <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
             <Settings className="w-5 h-5" />
             الإعدادات
           </a>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-2 text-red-500 font-medium text-sm hover:text-red-700 w-full px-4 py-2 hover:bg-red-50 rounded-lg transition-colors">
             <LogOut className="w-4 h-4" />
             تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
           <div>
             <h2 className="text-2xl font-bold text-gray-900">مرحباً, {doctor.name}</h2>
             <p className="text-gray-500 text-sm">إليك ملخص الحجوزات لليوم</p>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                 <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="بحث عن مريضة..." 
                   className="pl-4 pr-10 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-200 w-64 text-sm"
                 />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                 <img src={doctor.image} alt="Profile" className="w-full h-full object-cover" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
           {/* Appointments List */}
           <div className="xl:col-span-2 space-y-8">
              
              {/* Stats Overview */}
              <div className="grid grid-cols-3 gap-4">
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">حجوزات جديدة</div>
                    <div className="text-3xl font-bold text-rose-500">{stats.pending}</div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">مواعيد مؤكدة</div>
                    <div className="text-3xl font-bold text-sky-500">{stats.totalAppointments - stats.pending - stats.completed}</div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">تمت المعاينة</div>
                    <div className="text-3xl font-bold text-emerald-500">{stats.completed}</div>
                 </div>
              </div>

              {/* Pending Requests */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">طلبات الحجز الجديدة</h3>
                    <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold">{pendingAppointments.length}</span>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {pendingAppointments.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            لا توجد طلبات حجز جديدة
                        </div>
                    ) : (
                        pendingAppointments.map((apt) => (
                            <div key={apt.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
                                            {apt.patientName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-lg">{apt.patientName}</div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {apt.patientPhone}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(apt.date).toLocaleString('ar-MA')}</span>
                                            </div>
                                            {apt.reason && (
                                                <div className="mt-2 text-sm bg-gray-50 p-2 rounded text-gray-700 inline-block border border-gray-100">
                                                    <span className="text-gray-400 text-xs ml-1">السبب:</span>
                                                    {apt.reason}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 font-mono">
                                        #{apt.id.slice(-4)}
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 mr-14">
                                    <Button 
                                        onClick={() => onUpdateStatus(apt.id, AppointmentStatus.CONFIRMED)}
                                        className="!py-2 !px-4 !text-sm flex items-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        تأكيد الموعد
                                    </Button>
                                    <Button 
                                        variant="outline"
                                        onClick={() => onUpdateStatus(apt.id, AppointmentStatus.CANCELLED)}
                                        className="!py-2 !px-4 !text-sm flex items-center gap-2 text-gray-500 border-gray-300 hover:border-red-300 hover:text-red-500 hover:bg-red-50"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        رفض
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                 </div>
              </div>

              {/* Confirmed Appointments */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">المواعيد القادمة</h3>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {confirmedAppointments.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            لا توجد مواعيد مؤكدة
                        </div>
                    ) : (
                        confirmedAppointments.map((apt) => (
                            <div key={apt.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-12 bg-sky-500 rounded-full"></div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{apt.patientName}</div>
                                        <div className="text-sm text-gray-500 flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(apt.date).toLocaleDateString('ar-MA')} 
                                            <span className="mx-1">|</span>
                                            {new Date(apt.date).toLocaleTimeString('ar-MA', {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => onUpdateStatus(apt.id, AppointmentStatus.COMPLETED)}
                                        className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                                        title="تمت الزيارة"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => onUpdateStatus(apt.id, AppointmentStatus.CANCELLED)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="إلغاء"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                 </div>
              </div>
           </div>

           {/* Sidebar Info */}
           <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-6">أداء العيادة</h3>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis hide />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                  </div>
              </div>

              <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-800 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                 <h4 className="font-bold text-lg mb-2 relative z-10">رسائل التذكير</h4>
                 <p className="text-indigo-200 text-sm mb-4 relative z-10">
                    تم إرسال 15 رسالة تذكير للمواعيد القادمة غداً تلقائياً.
                 </p>
                 <Button variant="outline" className="w-full text-xs border-indigo-700 text-indigo-100 hover:bg-indigo-800 relative z-10">
                    إدارة الرسائل
                 </Button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};