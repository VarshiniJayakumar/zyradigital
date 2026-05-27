import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../components/Logo';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('overview');
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('zd_token');

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, enrollRes] = await Promise.all([
        axios.get(`${BASE}/api/admin/stats`, { headers }),
        axios.get(`${BASE}/api/admin/users`, { headers }),
        axios.get(`${BASE}/api/admin/enrollments`, { headers }),
      ]);
      setData(statsRes.data);
      setUsers(usersRes.data);
      setEnrollments(enrollRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const fmt = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <svg className="animate-spin w-10 h-10 text-blue-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-lg border border-red-100">
        <div className="text-4xl mb-3">⚠️</div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Cannot Load Dashboard</h2>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <button onClick={fetchAll} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold">Retry</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <div>
            <div className="text-sm font-bold text-slate-800">Admin Dashboard</div>
            <div className="text-xs text-slate-400">ZyraDigital</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchAll} className="text-xs text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
            🔄 Refresh
          </button>
          <button onClick={onLogout} className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
            Log Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label:'Total Signups',     value: data?.totalUsers || 0,       icon:'👥', color:'bg-blue-50 text-blue-600' },
            { label:'Total Enrollments', value: data?.totalEnrollments || 0, icon:'📋', color:'bg-green-50 text-green-600' },
            { label:'Recent (7 days)',   value: users.filter(u => new Date(u.createdAt) > new Date(Date.now()-7*86400000)).length, icon:'📅', color:'bg-purple-50 text-purple-600' },
            { label:'Conversion Rate',   value: data?.totalUsers ? `${Math.round((data.totalEnrollments/data.totalUsers)*100)}%` : '0%', icon:'📈', color:'bg-orange-50 text-orange-600' },
          ].map((s,i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
              <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[['overview','📊 Overview'],['users','👥 Signups'],['enrollments','📋 Enrollments']].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab===t ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent signups */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Recent Signups</h3>
                <span className="text-xs text-slate-400">{data?.recentUsers?.length || 0} latest</span>
              </div>
              <div className="divide-y divide-slate-50">
                {(data?.recentUsers || []).map((u,i) => (
                  <div key={i} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{u.name}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{fmt(u.createdAt)}</div>
                  </div>
                ))}
                {(!data?.recentUsers?.length) && <div className="px-6 py-8 text-center text-slate-400 text-sm">No signups yet</div>}
              </div>
            </div>

            {/* Recent enrollments */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Recent Enrollments</h3>
                <span className="text-xs text-slate-400">{data?.recentEnrollments?.length || 0} latest</span>
              </div>
              <div className="divide-y divide-slate-50">
                {(data?.recentEnrollments || []).map((e,i) => (
                  <div key={i} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs font-bold">
                        {e.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{e.name}</div>
                        <div className="text-xs text-slate-400">{e.phone}</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{fmt(e.createdAt)}</div>
                  </div>
                ))}
                {(!data?.recentEnrollments?.length) && <div className="px-6 py-8 text-center text-slate-400 text-sm">No enrollments yet</div>}
              </div>
            </div>
          </div>
        )}

        {/* All Users */}
        {tab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">All Signups ({users.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['#','Name','Email','Phone','Role','Joined'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((u,i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-400 text-xs">{i+1}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{u.name}</td>
                      <td className="px-4 py-3 text-slate-600">{u.email}</td>
                      <td className="px-4 py-3 text-slate-600">{u.phone || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${u.role==='admin'?'bg-purple-100 text-purple-700':'bg-blue-100 text-blue-700'}`}>{u.role}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{fmt(u.createdAt)}</td>
                    </tr>
                  ))}
                  {!users.length && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No users yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* All Enrollments */}
        {tab === 'enrollments' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">All Enrollments ({enrollments.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['#','Name','Email','Phone','Message','Date'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {enrollments.map((e,i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-400 text-xs">{i+1}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{e.name}</td>
                      <td className="px-4 py-3 text-slate-600">{e.email}</td>
                      <td className="px-4 py-3 text-slate-600">{e.phone}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs max-w-xs truncate">{e.message || '—'}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{fmt(e.createdAt)}</td>
                    </tr>
                  ))}
                  {!enrollments.length && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No enrollments yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
