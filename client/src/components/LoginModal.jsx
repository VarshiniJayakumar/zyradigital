import { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';

export default function LoginModal({ onClose }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password.trim()) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');

    const base = import.meta.env.VITE_API_URL || '';

    // If no backend URL configured, show helpful message
    if (!base) {
      setStatus('error');
      setServerError('Backend not connected. Please set VITE_API_URL in Netlify environment variables pointing to your Render backend URL.');
      return;
    }

    try {
      const res = await axios.post(`${base}/api/auth/login`, form, { timeout: 10000 });
      localStorage.setItem('zd_token', res.data.token);
      localStorage.setItem('zd_user', JSON.stringify(res.data.user));
      setStatus('success');
      setTimeout(() => onClose(res.data.user), 800);
    } catch (err) {
      setStatus('error');
      if (err.code === 'ECONNABORTED' || err.message === 'Network Error' || !err.response) {
        setServerError('Cannot reach the server. Make sure your Render backend is running and VITE_API_URL is set correctly in Netlify.');
      } else {
        setServerError(err.response?.data?.message || 'Invalid email or password.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600" />

        <div className="p-8">
          <button onClick={() => onClose(null)}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Welcome Back!</h3>
              <p className="text-slate-500">Logging you in...</p>
            </div>
          ) : (
            <>
              <div className="mb-5"><Logo size={44} /></div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome Back</h3>
              <p className="text-slate-500 text-sm mb-6">Sign in to your ZyraDigital account.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    placeholder="you@example.com"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    placeholder="••••••••"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 leading-relaxed">
                    ⚠️ {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors disabled:opacity-60 shadow-md shadow-blue-100"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Signing in...
                    </span>
                  ) : 'Sign In →'}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onClose('enroll')}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Enroll Now
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
