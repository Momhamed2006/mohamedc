import React, { useState } from 'react';
import { 
  Phone, MapPin, Calendar, Menu, X, Heart, Baby, 
  Stethoscope, Activity, Clock, ChevronDown, CheckCircle 
} from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Doctor, Appointment } from '../types';

interface PublicWebsiteProps {
  doctors: Doctor[];
  onBookAppointment: (data: any) => void;
}

export const PatientFlow: React.FC<PublicWebsiteProps> = ({ doctors, onBookAppointment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    doctorId: doctors[0]?.id || '',
    date: '',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'team', label: 'أطباؤنا' },
    { id: 'booking', label: 'حجز موعد' },
    { id: 'contact', label: 'اتصل بنا' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date) return;
    
    onBookAppointment(bookingForm);
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setBookingForm({ name: '', phone: '', doctorId: doctors[0]?.id || '', date: '', reason: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-rose-500" fill="currentColor" />
              </div>
              <div>
                 <h1 className="text-xl font-bold text-gray-900 leading-none">عيادة النّسيم</h1>
                 <span className="text-xs text-rose-500 font-medium">Clinique Naissance</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors ${activeSection === link.id ? 'text-rose-500' : 'text-gray-500 hover:text-rose-400'}`}
                >
                  {link.label}
                </button>
              ))}
              <Button onClick={() => scrollToSection('booking')} className="!py-2 !px-4 !text-sm">
                احجزي الآن
              </Button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-500 p-2">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 shadow-lg">
             {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-right px-4 py-3 text-gray-600 hover:bg-rose-50 rounded-lg"
                >
                  {link.label}
                </button>
              ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 bg-gradient-to-b from-rose-50 to-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-sky-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center md:text-right">
             <span className="inline-block px-4 py-1.5 bg-white border border-rose-100 rounded-full text-rose-500 text-sm font-bold mb-6 shadow-sm">
               رعاية طبية متكاملة للأم والطفل
             </span>
             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
               رعاية حمل وولادة <br/> 
               <span className="text-rose-500">آمنة وحنونة</span>
             </h1>
             <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
               في عيادة النّسيم، نرافقكِ في أجمل رحلة في العمر. فريق طبي متمرّس يضمن لكِ ولطفلكِ أقصى درجات العناية والراحة، من الحمل وحتى الولادة.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
               <Button onClick={() => scrollToSection('booking')} className="shadow-rose-300/50">
                 احجزي موعدك الآن
               </Button>
               <Button variant="outline" onClick={() => scrollToSection('services')}>
                 اكتشفي خدماتنا
               </Button>
             </div>
          </div>
          <div className="relative">
             <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Pregnant woman smiling" 
                  className="w-full h-auto object-cover"
                />
             </div>
             {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="bg-sky-100 p-2 rounded-full">
                   <Activity className="w-6 h-6 text-sky-500" />
                </div>
                <div>
                   <p className="text-xs text-gray-500">خبرة أكثر من</p>
                   <p className="font-bold text-gray-900">15 سنة</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">خدماتنا الطبية</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">نقدم لكِ مجموعة شاملة من الخدمات الطبية لضمان صحتكِ وسلامة مولودكِ.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Baby className="w-8 h-8 text-rose-500" />, title: 'متابعة الحمل', desc: 'فحوصات دورية شاملة للاطمئنان على صحة الأم ونمو الجنين بانتظام.' },
              { icon: <Activity className="w-8 h-8 text-sky-500" />, title: 'الولادة (طبيعية/قيصرية)', desc: 'تجهيزات متكاملة لاستقبال مولودك في بيئة آمنة ومعقمة بإشراف مختصين.' },
              { icon: <Stethoscope className="w-8 h-8 text-indigo-500" />, title: 'رعاية حديثي الولادة', desc: 'الفحص الأول للمولود، التحصينات، ومتابعة النمو في الأشهر الأولى.' },
              { icon: <Heart className="w-8 h-8 text-red-400" />, title: 'التخطيط للحمل', desc: 'استشارات ما قبل الحمل وفحوصات الخصوبة لضمان بداية سليمة.' },
              { icon: <Activity className="w-8 h-8 text-teal-500" />, title: 'السونار (Ultrasound)', desc: 'أحدث أجهزة التصوير ثلاثي ورباعي الأبعاد لرؤية الجنين بوضوح.' },
              { icon: <Clock className="w-8 h-8 text-orange-400" />, title: 'طوارئ نسائية 24/7', desc: 'فريقنا جاهز لاستقبال الحالات الطارئة في أي وقت لضمان سلامتكم.' },
            ].map((service, idx) => (
              <div key={idx} className="bg-gray-50 hover:bg-white hover:shadow-xl transition-all p-8 rounded-2xl border border-gray-100 group">
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-rose-50/50">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">فريقنا الطبي</h2>
              <p className="text-gray-500">نخبة من الأطباء والمختصين في طب النساء والتوليد.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {doctors.map(doc => (
                <div key={doc.id} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center">
                   <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-rose-50">
                     <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-1">{doc.name}</h3>
                   <p className="text-rose-500 font-medium text-sm mb-4">{doc.speciality}</p>
                   <Button variant="outline" className="text-xs px-4 py-2 w-full rounded-xl">
                     عرض الملف الشخصي
                   </Button>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-white relative">
         <div className="max-w-4xl mx-auto px-4">
           <div className="bg-sky-50 rounded-3xl overflow-hidden shadow-xl border border-sky-100 flex flex-col md:flex-row">
              <div className="md:w-5/12 bg-sky-500 p-10 text-white flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                 <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-4">حجز موعد جديد</h3>
                   <p className="text-sky-100 mb-8 leading-relaxed">
                     املئي الاستمارة وسنقوم بتأكيد موعدك في أقرب وقت. نحن هنا لراحتك.
                   </p>
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sky-50">
                        <Phone className="w-5 h-5" />
                        <span dir="ltr">07 70 07 73 40</span>
                      </div>
                      <div className="flex items-center gap-3 text-sky-50">
                        <MapPin className="w-5 h-5" />
                        <span>ولاد برحيل الشارع الرئيسي عمارة الهدى الطابق الاول</span>
                      </div>
                   </div>
                 </div>
              </div>

              <div className="md:w-7/12 p-10 bg-white">
                 {submitted ? (
                   <div className="h-full flex flex-col items-center justify-center text-center py-10">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">تم استلام طلبك!</h3>
                      <p className="text-gray-500">
                        شكراً لكِ، {bookingForm.name}. سنتواصل معكِ قريباً عبر الهاتف أو الواتساب لتأكيد الموعد.
                      </p>
                   </div>
                 ) : (
                   <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <Input 
                        label="الاسم الكامل" 
                        placeholder="مثال: ليلى العلمي" 
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        required
                      />
                      <Input 
                        label="رقم الهاتف" 
                        placeholder="06 XX XX XX XX" 
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        required
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">اختيار الطبيب</label>
                        <div className="relative">
                          <select 
                            className="block w-full rounded-xl border-gray-300 border p-3 focus:ring-rose-500 focus:border-rose-500 sm:text-sm appearance-none bg-white"
                            value={bookingForm.doctorId}
                            onChange={(e) => setBookingForm({...bookingForm, doctorId: e.target.value})}
                          >
                             {doctors.map(d => (
                               <option key={d.id} value={d.id}>{d.name} ({d.speciality})</option>
                             ))}
                          </select>
                          <ChevronDown className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <Input 
                        label="التاريخ المفضل" 
                        type="datetime-local"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        required
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">سبب الزيارة (اختياري)</label>
                        <textarea 
                          className="block w-full rounded-xl border-gray-300 border p-3 focus:ring-rose-500 focus:border-rose-500 sm:text-sm h-24"
                          placeholder="مثال: فحص دوري، استشارة ولادة..."
                          value={bookingForm.reason}
                          onChange={(e) => setBookingForm({...bookingForm, reason: e.target.value})}
                        ></textarea>
                      </div>

                      <Button type="submit" fullWidth className="mt-2">
                        إرسال الطلب
                      </Button>
                      
                      <p className="text-xs text-center text-gray-400 mt-4">
                        بإرسال هذا النموذج، توافقين على سياسة الخصوصية الخاصة بنا.
                      </p>
                   </form>
                 )}
              </div>
           </div>
         </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/212770077340" 
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors flex items-center gap-2 group"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        <span className="hidden group-hover:block font-medium pr-1">تواصلي معنا</span>
      </a>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                  </div>
                  <span className="text-xl font-bold text-white">عيادة النّسيم</span>
               </div>
               <p className="text-sm leading-relaxed max-w-sm">
                 نسعى لتقديم أفضل خدمات الرعاية الصحية للأم والطفل في بيئة آمنة ومريحة.
               </p>
            </div>
            
            <div>
               <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
               <ul className="space-y-2 text-sm">
                  <li><button onClick={() => scrollToSection('home')} className="hover:text-white">الرئيسية</button></li>
                  <li><button onClick={() => scrollToSection('services')} className="hover:text-white">خدماتنا</button></li>
                  <li><button onClick={() => scrollToSection('team')} className="hover:text-white">الأطباء</button></li>
                  <li><button onClick={() => scrollToSection('booking')} className="hover:text-white">حجز موعد</button></li>
               </ul>
            </div>

            <div>
               <h4 className="text-white font-bold mb-4">اتصل بنا</h4>
               <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                     <Phone className="w-4 h-4 text-gray-500" />
                     <span dir="ltr">07 70 07 73 40</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <MapPin className="w-4 h-4 text-gray-500" />
                     <span>ولاد برحيل الشارع الرئيسي عمارة الهدى الطابق الاول</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <Clock className="w-4 h-4 text-gray-500" />
                     <span>الإثنين - الجمعة: 9:00 - 18:00</span>
                  </li>
               </ul>
            </div>
         </div>
         <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Clinique Naissance. جميع الحقوق محفوظة.
         </div>
      </footer>
    </div>
  );
};