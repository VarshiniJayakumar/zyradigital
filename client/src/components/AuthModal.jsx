import { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AuthModal({ onClose, defaultTab = 'signup' }) {
  const [tab, setTab] = useState(defaultTab); // 'signup' | 'login'

  // Signup state
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [signupErrors, setSignupErrors] = useState({});
  const [signupStatus, setSignupStatus] = useState('idle');
  const [signupServerError, setSignupServerError] = useState('');

  // Login state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState('idle');
  const [loginServerError, setLoginServerError] = useState('');

  // ── Signup ──────────────────────────────────────────────
  const validateSignup = () => {
    const e = {};
    if (!signupForm.name.trim()) e.name = 'Name is required';
    if (!signupForm.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(signupForm.email)) e.email = 'Enter a valid email';
    if (!signupForm.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{7,15}$/.test(signupForm.phone)) e.phone = 'Must be 7–15 digits';
    if (!signupForm.password) e.password = 'Password is required';
    else if (signupForm.password.length < 6) e.password = 'Minimum 6 characters';
    if (signupForm.confirm !== signupForm.password) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errs = validateSignup();
    if (Object.keys(errs).length) { setSignupErrors(errs); return; }
    setSignupErrors({});
    setSignupStatus('loading');
    try {
      const res = await axios.post(`${BASE}/api/auth/register`, {
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        password: signupForm.password,
      }, { timeout: 10000 });
      localStorage.setItem('zd_token', res.data.token);
      localStorage.setItem('zd_user', JSON.stringify(res.data.user));
      setSignupStatus('success');
      setTimeout(() => onClose(res.data.user), 800);
    } catch (err) {
      setSignupStatus('error');
      if (!err.response) {
        setSignupServerError('Cannot reach server. Make sure VITE_API_URL is set in Netlify and your Render backend is running.');
      } else {
        setSignupServerError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  // ── Login ───────────────────────────────────────────────
  const validateLogin = () => {
    const e = {};
    if (!loginForm.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(loginForm.email)) e.email = 'Enter a valid email';
    if (!loginForm.password) e.password = 'Password is required';
    else if (loginForm.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validateLogin();
    if (Object.keys(errs).length) { setLoginErrors(errs); return; }
    setLoginErrors({});
    setLoginStatus('loading');
    try {
      const res = await axios.post(`${BASE}/api/auth/login`, {
        email: loginForm.email,
        password: loginForm.password,
      }, { timeout: 10000 });
      localStorage.setItem('zd_token', res.data.token);
      localStorage.setItem('zd_user', JSON.stringify(res.data.user));
      setLoginStatus('success');
      setTimeout(() => onClose(res.data.user), 800);
    } catch (err) {
      setLoginStatus('error');
      if (!err.response) {
        setLoginServerError('Cannot reach server. Make sure VITE_API_URL is set in Netlify and your Render backend is running.');
      } else {
        setLoginServerError(err.response?.data?.message || 'Invalid email or password.');
      }
    }
  };

  // ── Helpers ─────────────────────────────────────────────
  const inputClass = (err) =>
    `w-full border rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${err ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`;

  const Spinner = () => (
    <svg className="animate-spin w-4 h-4 inline mr-2" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
    </svg>
  );

  const isSuccess = (tab === 'signup' && signupStatus === 'success') || (tab === 'login' && loginStatus === 'success');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 sticky top-0 z-10" />

        <div className="p-8">
          {/* Close */}
          <button onClick={() => onClose(null)}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          {/* Success screen */}
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
              {/* Logo */}
              <div className="mb-6"><Logo size={44} /></div>

              {/* Tabs */}
              <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setTab('signup')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === 'signup' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  Sign Up
                </button>
                <button
                  onClick={() => setTab('login')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  Log In
                </button>
              </div>

              {/* ── SIGNUP FORM ── */}
              {tab === 'signup' && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input type="text" value={signupForm.name} placeholder="Your full name"
                      onChange={e => setSignupForm({ ...signupForm, name: e.target.value })}
                      className={inputClass(signupErrors.name)} />
                    {signupErrors.name && <p className="text-red-500 text-xs mt-1">{signupErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <input type="email" value={signupForm.email} placeholder="you@example.com"
                      onChange={e => setSignupForm({ ...signupForm, email: e.target.value })}
                      className={inputClass(signupErrors.email)} />
                    {signupErrors.email && <p className="text-red-500 text-xs mt-1">{signupErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <input type="tel" value={signupForm.phone} placeholder="9876543210"
                      onChange={e => setSignupForm({ ...signupForm, phone: e.target.value })}
                      className={inputClass(signupErrors.phone)} />
                    {signupErrors.phone && <p className="text-red-500 text-xs mt-1">{signupErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <input type="password" value={signupForm.password} placeholder="Min 6 characters"
                      onChange={e => setSignupForm({ ...signupForm, password: e.target.value })}
                      className={inputClass(signupErrors.password)} />
                    {signupErrors.password && <p className="text-red-500 text-xs mt-1">{signupErrors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                    <input type="password" value={signupForm.confirm} placeholder="Re-enter password"
                      onChange={e => setSignupForm({ ...signupForm, confirm: e.target.value })}
                      className={inputClass(signupErrors.confirm)} />
                    {signupErrors.confirm && <p className="text-red-500 text-xs mt-1">{signupErrors.confirm}</p>}
                  </div>

                  {signupStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 leading-relaxed">
                      ⚠️ {signupServerError}
                    </div>
                  )}

                  <button type="submit" disabled={signupStatus === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors disabled:opacity-60 shadow-md shadow-blue-100">
                    {signupStatus === 'loading' ? <><Spinner />Creating Account...</> : 'Create Account →'}
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setTab('login')}
                      className="text-blue-600 font-semibold hover:underline">Log In</button>
                  </p>
                </form>
              )}

              {/* ── LOGIN FORM ── */}
              {tab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <input type="email" value={loginForm.email} placeholder="you@example.com"
                      onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                      className={inputClass(loginErrors.email)} />
                    {loginErrors.email && <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <input type="password" value={loginForm.password} placeholder="••••••••"
                      onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                      className={inputClass(loginErrors.password)} />
                    {loginErrors.password && <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>}
                  </div>

                  {loginStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 leading-relaxed">
                      ⚠️ {loginServerError}
                    </div>
                  )}

                  <button type="submit" disabled={loginStatus === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors disabled:opacity-60 shadow-md shadow-blue-100">
                    {loginStatus === 'loading' ? <><Spinner />Signing in...</> : 'Sign In →'}
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setTab('signup')}
                      className="text-blue-600 font-semibold hover:underline">Sign Up</button>
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
