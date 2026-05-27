import { useState } from 'react';
import axios from 'axios';

export default function EnrollModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.length > 100) e.name = 'Name cannot exceed 100 characters';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\d{7,15}$/.test(form.phone)) e.phone = 'Phone must be 7–15 digits';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      await axios.post('http://localhost:5000/api/enrollment', form);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Something went wrong. Please try again.'
      );
    }
  };

  const field = (name, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className={`w-full bg-brand-dark border rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-500 transition-colors ${
          errors[name] ? 'border-red-500' : 'border-brand-border'
        }`}
      />
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="card-bg rounded-3xl p-8 w-full max-w-md relative shadow-2xl shadow-purple-900/50">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-black text-white mb-2">You're In!</h3>
            <p className="text-gray-400 mb-6">Enrollment submitted successfully. We'll contact you shortly on WhatsApp.</p>
            <button onClick={onClose} className="gradient-btn text-white font-bold px-8 py-3 rounded-full">
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-black text-white mb-1">Enroll Now</h3>
            <p className="text-gray-400 text-sm mb-6">Fill in your details and we'll reach out to confirm your seat.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {field('name', 'Full Name', 'text', 'Your full name')}
              {field('email', 'Email Address', 'email', 'you@example.com')}
              {field('phone', 'Phone Number', 'tel', '9876543210')}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Message (optional)</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Any questions or notes..."
                  rows={3}
                  className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm bg-red-900/20 border border-red-700/40 rounded-xl px-4 py-3">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="gradient-btn w-full text-white font-bold py-3.5 rounded-2xl text-base disabled:opacity-60"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Enrollment ✦'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
