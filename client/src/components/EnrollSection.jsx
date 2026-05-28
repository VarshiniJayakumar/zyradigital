import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'https://zyradigital.onrender.com';

export default function EnrollSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
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
      await axios.post(`${BASE}/api/enrollment`, form, { timeout: 15000 });
      setStatus('success');
      setForm({ name: '', email: '', phone: '' });
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const ic = (err) =>
    `w-full rounded-xl px-4 py-3.5 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-white border ${err ? 'border-red-400' : 'border-slate-200'}`;

  return (
    <section id="enroll" ref={ref} className="py-20 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left */}
          <div className="reveal flex-1">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              🎯 Limited Seats Available
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              Start Your Digital Marketing<br />Journey Today
            </h2>
            <p className="text-blue-100 text-lg mb-6 leading-relaxed">
              Fill in your details and our team will contact you within 24 hours to confirm your enrollment.
            </p>
            <div className="space-y-2.5 mb-8">
              {[
                '✅ 30 Days Live Online Classes',
                '✅ Lifetime Mentor Support',
                '✅ Tamil Medium Training',
                '✅ Real Client Strategies',
              ].map((item, i) => (
                <div key={i} className="text-blue-100 text-sm">{item}</div>
              ))}
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 inline-block">
              <div className="text-white/60 text-sm line-through">₹15,000</div>
              <div className="text-4xl font-black text-white">₹7,499</div>
              <div className="text-blue-200 text-xs mt-1">One-time · No hidden costs</div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal flex-1 w-full max-w-md">
            {status === 'success' ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-2xl">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">You're In!</h3>
                <p className="text-slate-500 mb-2">Enrollment received successfully.</p>
                <p className="text-slate-500 text-sm mb-6">We'll contact you within 24 hours on WhatsApp to confirm your seat.</p>
                <button onClick={() => setStatus('idle')}
                  className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors">
                  Submit Another
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">Secure Your Seat</h3>
                <p className="text-slate-500 text-sm mb-6">No payment now — we'll call you to confirm.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                    <input type="text" value={form.name} placeholder="Your full name"
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={ic(errors.name)} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                    <input type="email" value={form.email} placeholder="you@example.com"
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className={ic(errors.email)} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">WhatsApp Number</label>
                    <input type="tel" value={form.phone} placeholder="9876543210"
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className={ic(errors.phone)} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                      ⚠️ {errMsg}
                    </div>
                  )}

                  <button type="submit" disabled={status === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl text-base transition-colors disabled:opacity-60 shadow-md">
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Secure My Seat →'}
                  </button>
                  <p className="text-center text-slate-400 text-xs">🔒 No spam · We'll only contact you about your enrollment</p>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
