import { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';

export default function EnrollModal({ onClose }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.length > 100) e.name = 'Max 100 characters';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{7,15}$/.test(form.phone)) e.phone = 'Must be 7–15 digits';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${base}/api/enrollment`, form);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Something went wrong. Please try again.');
    }
  };

  const field = (name, label, type='text', placeholder='') => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input type={type} value={form[name]} placeholder={placeholder}
        onChange={e => setForm({...form,[name]:e.target.value})}
        className={`w-full border rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors[name]?'border-red-400 bg-red-50':'border-slate-200 bg-white'}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden">
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600" />

        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🎉</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">You're Enrolled!</h3>
              <p className="text-slate-500 mb-6">We'll contact you shortly on WhatsApp to confirm your seat.</p>
              <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors">Done</button>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <Logo size={32} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Secure Your Seat</h3>
              <p className="text-slate-500 text-sm mb-6">Fill in your details and we'll confirm your enrollment.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {field('name',  'Full Name',     'text',  'Your full name')}
                {field('email', 'Email Address', 'email', 'you@example.com')}
                {field('phone', 'Phone Number',  'tel',   '9876543210')}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message (optional)</label>
                  <textarea value={form.message} rows={3} placeholder="Any questions..."
                    onChange={e => setForm({...form,message:e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"/>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{serverError}</div>
                )}

                <button type="submit" disabled={status==='loading'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors disabled:opacity-60 shadow-md shadow-blue-100">
                  {status==='loading' ? 'Submitting...' : 'Confirm Enrollment ✦'}
                </button>
                <p className="text-center text-xs text-slate-400">🔒 Your information is secure and private</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
