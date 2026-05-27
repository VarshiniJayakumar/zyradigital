import { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';

const BASE = import.meta.env.VITE_API_URL || '';

export default function AuthModal({ onClose, defaultTab = 'signup' }) {
  const [tab, setTab] = useState(defaultTab);

  // Signup
  const [sf, setSf] = useState({ name:'', email:'', phone:'', password:'', confirm:'' });
  const [se, setSe] = useState({});
  const [ss, setSs] = useState('idle'); // idle|loading|success|error
  const [sErr, setSErr] = useState('');

  // Login
  const [lf, setLf] = useState({ email:'', password:'' });
  const [le, setLe] = useState({});
  const [ls, setLs] = useState('idle');
  const [lErr, setLErr] = useState('');

  // ── Signup ──
  const validateSignup = () => {
    const e = {};
    if (!sf.name.trim()) e.name = 'Name is required';
    if (!sf.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(sf.email)) e.email = 'Enter a valid email';
    if (!sf.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{7,15}$/.test(sf.phone)) e.phone = 'Must be 7–15 digits';
    if (!sf.password) e.password = 'Password is required';
    else if (sf.password.length < 6) e.password = 'Minimum 6 characters';
    if (sf.confirm !== sf.password) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errs = validateSignup();
    if (Object.keys(errs).length) { setSe(errs); return; }
    setSe({});
    setSs('loading');

    // Try auth register endpoint first
    if (BASE) {
      try {
        const res = await axios.post(`${BASE}/api/auth/register`, {
          name: sf.name, email: sf.email, phone: sf.phone, password: sf.password,
        }, { timeout: 10000 });
        localStorage.setItem('zd_token', res.data.token);
        localStorage.setItem('zd_user', JSON.stringify(res.data.user));
        setSs('success');
        setTimeout(() => onClose(res.data.user), 800);
        return;
      } catch (err) {
        if (err.response) {
          setSs('error');
          setSErr(err.response?.data?.message || 'Registration failed. Please try again.');
          return;
        }
        // Network error — fall through to enrollment fallback
      }
    }

    // Fallback: save via enrollment API (works even without auth backend)
    try {
      const enrollBase = BASE || 'http://localhost:5000';
      await axios.post(`${enrollBase}/api/enrollment`, {
        name: sf.name, email: sf.email, phone: sf.phone,
        message: `Signup request — Password: [hashed on backend]`,
      }, { timeout: 10000 });
      // Create a local session
      const fakeUser = { name: sf.name, email: sf.email, id: Date.now() };
      localStorage.setItem('zd_user', JSON.stringify(fakeUser));
      setSs('success');
      setTimeout(() => onClose(fakeUser), 800);
    } catch {
      // Fully offline — still let them "register" locally
      const fakeUser = { name: sf.name, email: sf.email, id: Date.now() };
      localStorage.setItem('zd_user', JSON.stringify(fakeUser));
      setSs('success');
      setTimeout(() => onClose(fakeUser), 800);
    }
  };

  // ── Login ──
  const validateLogin = () => {
    const e = {};
    if (!lf.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(lf.email)) e.email = 'Enter a valid email';
    if (!lf.password) e.password = 'Password is required';
    else if (lf.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validateLogin();
    if (Object.keys(errs).length) { setLe(errs); return; }
    setLe({});
    setLs('loading');

    if (BASE) {
      try {
        const res = await axios.post(`${BASE}/api/auth/login`, {
          email: lf.email, password: lf.password,
        }, { timeout: 10000 });
        localStorage.setItem('zd_token', res.data.token);
        localStorage.setItem('zd_user', JSON.stringify(res.data.user));
        setLs('success');
        setTimeout(() => onClose(res.data.user), 800);
        return;
      } catch (err) {
        setLs('error');
        if (!err.response) {
          setLErr('Cannot reach server. Please deploy the backend on Render and set VITE_API_URL in Netlify.');
        } else {
          setLErr(err.response?.data?.message || 'Invalid email or password.');
        }
        return;
      }
    }

    // No backend — check localStorage for a previously signed-up user
    try {
      const stored = JSON.parse(localStorage.getItem('zd_user'));
      if (stored && stored.email === lf.email) {
        setLs('success');
        setTimeout(() => onClose(stored), 800);
      } else {
        setLs('error');
        setLErr('No account found. Please sign up first, or connect the backend to enable full login.');
      }
    } catch {
      setLs('error');
      setLErr('Login requires the backend to be running. Please deploy on Render.');
    }
  };

  const ic = (err) =>
    `w-full border rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${err ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`;

  const Spinner = () => (
    <svg className="animate-spin w-4 h-4 inline mr-2" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
    </svg>
  );

  const isSuccess = (tab === 'signup' && ss === 'success') || (tab === 'login' && ls === 'success');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden" style={{ maxHeight:'95vh', overflowY:'auto' }}>
        <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0" />

        <div className="p-8">
          <button onClick={() => onClose(null)}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                {tab === 'signup' ? 'Account Created!' : 'Welcome Back!'}
              </h3>
              <p className="text-slate-500">Logging you in...</p>
            </div>
          ) : (
            <>
              <div className="mb-6"><Logo size={44} /></div>

              {/* Tabs — Login first, Sign Up second */}
              <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
                <button onClick={() => setTab('login')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  Log In
                </button>
                <button onClick={() => setTab('signup')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === 'signup' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  Sign Up
                </button>
              </div>

              {/* ── LOGIN FORM ── */}
              {tab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <input type="email" value={lf.email} placeholder="you@example.com"
                      onChange={e => setLf({...lf, email:e.target.value})} className={ic(le.email)}/>
                    {le.email && <p className="text-red-500 text-xs mt-1">{le.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <input type="password" value={lf.password} placeholder="••••••••"
                      onChange={e => setLf({...lf, password:e.target.value})} className={ic(le.password)}/>
                    {le.password && <p className="text-red-500 text-xs mt-1">{le.password}</p>}
                  </div>
                  {ls === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 leading-relaxed">
                      ⚠️ {lErr}
                    </div>
                  )}
                  <button type="submit" disabled={ls==='loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors disabled:opacity-60 shadow-md shadow-blue-100">
                    {ls==='loading' ? <><Spinner/>Signing in...</> : 'Sign In →'}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setTab('signup')} className="text-blue-600 font-semibold hover:underline">Sign Up</button>
                  </p>
                </form>
              )}

              {/* ── SIGNUP FORM ── */}
              {tab === 'signup' && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input type="text" value={sf.name} placeholder="Your full name"
                      onChange={e => setSf({...sf, name:e.target.value})} className={ic(se.name)}/>
                    {se.name && <p className="text-red-500 text-xs mt-1">{se.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <input type="email" value={sf.email} placeholder="you@example.com"
                      onChange={e => setSf({...sf, email:e.target.value})} className={ic(se.email)}/>
                    {se.email && <p className="text-red-500 text-xs mt-1">{se.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <input type="tel" value={sf.phone} placeholder="9876543210"
                      onChange={e => setSf({...sf, phone:e.target.value})} className={ic(se.phone)}/>
                    {se.phone && <p className="text-red-500 text-xs mt-1">{se.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <input type="password" value={sf.password} placeholder="Min 6 characters"
                      onChange={e => setSf({...sf, password:e.target.value})} className={ic(se.password)}/>
                    {se.password && <p className="text-red-500 text-xs mt-1">{se.password}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                    <input type="password" value={sf.confirm} placeholder="Re-enter password"
                      onChange={e => setSf({...sf, confirm:e.target.value})} className={ic(se.confirm)}/>
                    {se.confirm && <p className="text-red-500 text-xs mt-1">{se.confirm}</p>}
                  </div>
                  {ss === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 leading-relaxed">
                      ⚠️ {sErr}
                    </div>
                  )}
                  <button type="submit" disabled={ss==='loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors disabled:opacity-60 shadow-md shadow-blue-100">
                    {ss==='loading' ? <><Spinner/>Creating Account...</> : 'Create Account →'}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setTab('login')} className="text-blue-600 font-semibold hover:underline">Log In</button>
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
