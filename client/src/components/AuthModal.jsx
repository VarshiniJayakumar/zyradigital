import { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';

const BASE = import.meta.env.VITE_API_URL || '';

// Password rules
const pwRules = [
  { label: 'At least 6 characters',      test: (p) => p.length >= 6 },
  { label: 'One uppercase letter (A-Z)',  test: (p) => /[A-Z]/.test(p) },
  { label: 'One number (0-9)',            test: (p) => /[0-9]/.test(p) },
  { label: 'One special character (!@#)', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

function PasswordStrength({ password }) {
  const passed = pwRules.filter(r => r.test(password)).length;
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0,1,2,3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < passed ? colors[passed-1] : 'bg-slate-200'}`} />
        ))}
      </div>
      <div className="space-y-1 mt-2">
        {pwRules.map((r,i) => (
          <div key={i} className={`flex items-center gap-1.5 text-xs ${r.test(password) ? 'text-green-600' : 'text-slate-400'}`}>
            <span>{r.test(password) ? '✓' : '○'}</span>
            <span>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AuthModal({ onClose, defaultTab = 'login' }) {
  const [tab, setTab] = useState(defaultTab);

  // Signup
  const [sf, setSf] = useState({ name: '', email: '', password: '' });
  const [se, setSe] = useState({});
  const [ss, setSs] = useState('idle');
  const [sErr, setSErr] = useState('');
  const [showPw, setShowPw] = useState(false);

  // Login
  const [lf, setLf] = useState({ email: '', password: '' });
  const [le, setLe] = useState({});
  const [ls, setLs] = useState('idle');
  const [lErr, setLErr] = useState('');
  const [showLPw, setShowLPw] = useState(false);

  // ── Signup validation ──
  const validateSignup = () => {
    const e = {};
    if (!sf.name.trim()) e.name = 'Name is required';
    if (!sf.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(sf.email)) e.email = 'Enter a valid email';
    if (!sf.password) e.password = 'Password is required';
    else {
      const failed = pwRules.filter(r => !r.test(sf.password));
      if (failed.length) e.password = failed[0].label + ' required';
    }
    return e;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errs = validateSignup();
    if (Object.keys(errs).length) { setSe(errs); return; }
    setSe({});
    setSs('loading');

    if (BASE) {
      try {
        const res = await axios.post(`${BASE}/api/auth/register`, {
          name: sf.name, email: sf.email, password: sf.password,
        }, { timeout: 10000 });
        localStorage.setItem('zd_token', res.data.token);
        localStorage.setItem('zd_user', JSON.stringify(res.data.user));
        setSs('success');
        setTimeout(() => onClose(res.data.user), 600);
        return;
      } catch (err) {
        if (err.response) {
          setSs('error');
          setSErr(err.response?.data?.message || 'Registration failed.');
          return;
        }
      }
    }
    // Offline fallback
    const fakeUser = { name: sf.name, email: sf.email, id: Date.now() };
    localStorage.setItem('zd_user', JSON.stringify(fakeUser));
    setSs('success');
    setTimeout(() => onClose(fakeUser), 600);
  };

  // ── Login validation ──
  const validateLogin = () => {
    const e = {};
    if (!lf.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(lf.email)) e.email = 'Enter a valid email';
    if (!lf.password) e.password = 'Password is required';
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
        setTimeout(() => onClose(res.data.user), 600);
        return;
      } catch (err) {
        setLs('error');
        setLErr(!err.response ? 'Cannot reach server. Backend not connected yet.' : err.response?.data?.message || 'Invalid email or password.');
        return;
      }
    }
    // Offline fallback
    const stored = JSON.parse(localStorage.getItem('zd_user') || 'null');
    if (stored?.email === lf.email) {
      setLs('success');
      setTimeout(() => onClose(stored), 600);
    } else {
      setLs('error');
      setLErr('No account found with this email. Please sign up first.');
    }
  };

  const ic = (err) =>
    `w-full border rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${err ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`;

  const isSuccess = (tab === 'signup' && ss === 'success') || (tab === 'login' && ls === 'success');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden" style={{ maxHeight: '95vh', overflowY: 'auto' }}>
        <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600" />

        <div className="p-8">
          <button onClick={() => onClose(null)}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors">
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
              <p className="text-slate-500">Redirecting...</p>
            </div>
          ) : (
            <>
              <div className="mb-5"><Logo size={40} /></div>

              {/* Tabs */}
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

              {/* ── LOGIN ── */}
              {tab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input type="email" value={lf.email} placeholder="you@example.com"
                      onChange={e => setLf({ ...lf, email: e.target.value })} className={ic(le.email)} />
                    {le.email && <p className="text-red-500 text-xs mt-1">{le.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input type={showLPw ? 'text' : 'password'} value={lf.password} placeholder="Your password"
                        onChange={e => setLf({ ...lf, password: e.target.value })} className={ic(le.password) + ' pr-12'} />
                      <button type="button" onClick={() => setShowLPw(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-medium">
                        {showLPw ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {le.password && <p className="text-red-500 text-xs mt-1">{le.password}</p>}
                  </div>
                  {ls === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">⚠️ {lErr}</div>
                  )}
                  <button type="submit" disabled={ls === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60">
                    {ls === 'loading' ? 'Signing in...' : 'Sign In →'}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    No account?{' '}
                    <button type="button" onClick={() => setTab('signup')} className="text-blue-600 font-semibold hover:underline">Sign Up</button>
                  </p>
                </form>
              )}

              {/* ── SIGNUP ── */}
              {tab === 'signup' && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input type="text" value={sf.name} placeholder="Your full name"
                      onChange={e => setSf({ ...sf, name: e.target.value })} className={ic(se.name)} />
                    {se.name && <p className="text-red-500 text-xs mt-1">{se.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input type="email" value={sf.email} placeholder="you@example.com"
                      onChange={e => setSf({ ...sf, email: e.target.value })} className={ic(se.email)} />
                    {se.email && <p className="text-red-500 text-xs mt-1">{se.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input type={showPw ? 'text' : 'password'} value={sf.password} placeholder="Create a strong password"
                        onChange={e => setSf({ ...sf, password: e.target.value })} className={ic(se.password) + ' pr-12'} />
                      <button type="button" onClick={() => setShowPw(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-medium">
                        {showPw ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {se.password && <p className="text-red-500 text-xs mt-1">{se.password}</p>}
                    <PasswordStrength password={sf.password} />
                  </div>
                  {ss === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">⚠️ {sErr}</div>
                  )}
                  <button type="submit" disabled={ss === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60">
                    {ss === 'loading' ? 'Creating Account...' : 'Create Account →'}
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
