import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import api from '../../api/axios';

const COLORS = ['#C8102E', '#E53E3E', '#FC8181', '#FEB2B2', '#C53030', '#9B2C2C', '#742A2A', '#63171B'];

export default function Analytics() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard-stats');
        setStats(response.data.data);
      } catch {} finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-bg-surface rounded w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 bg-bg-surface rounded-2xl" />
          <div className="h-72 bg-bg-surface rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-base">Analytics</h1>
        <p className="text-text-muted mt-1">Detailed platform analytics and charts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
          <h3 className="text-lg font-bold text-text-base mb-4">User Growth (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={stats?.monthlyRegistrations || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="users" stroke="#C8102E" strokeWidth={2} dot={{ fill: '#C8102E', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
          <h3 className="text-lg font-bold text-text-base mb-4">Blood Group Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={stats?.bloodGroupDistribution || []} cx="50%" cy="50%" outerRadius={100} dataKey="value" nameKey="name" label={({ name, value }) => `${name}: ${value}`}>
                {(stats?.bloodGroupDistribution || []).map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-text-base mb-4">Donations Fulfilled (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats?.monthlyDonations || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px' }} />
              <Bar dataKey="donations" fill="#C8102E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
