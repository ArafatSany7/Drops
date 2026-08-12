import { Users, Droplet, Activity, Heart, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const COLORS = ['#C8102E', '#E53E3E', '#FC8181', '#FEB2B2', '#C53030', '#9B2C2C', '#742A2A', '#63171B'];

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.role === 'ADMIN') {
          const response = await api.get('/admin/dashboard-stats');
          setStats(response.data.data);
        } else {
          const response = await api.get('/stats');
          setStats({
            overview: {
              totalUsers: response.data.data.totalUsers,
              totalDonors: response.data.data.totalUsers,
              livesImpacted: response.data.data.livesImpacted,
              districtsCovered: response.data.data.districtsCovered,
            }
          });
        }
      } catch {
        // Fallback data
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-bg-surface rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-bg-surface rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 bg-bg-surface rounded-2xl" />
          <div className="h-72 bg-bg-surface rounded-2xl" />
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === 'ADMIN';
  const overview = stats?.overview || {};

  const overviewCards = isAdmin ? [
    { icon: Users, label: 'Total Users', value: overview.totalUsers || 0, color: 'bg-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: Droplet, label: 'Active Donors', value: overview.totalDonors || 0, color: 'bg-primary', bg: 'bg-red-50 dark:bg-red-900/20' },
    { icon: Activity, label: 'Active Requests', value: overview.activeRequests || 0, color: 'bg-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { icon: Heart, label: 'Lives Impacted', value: overview.livesImpacted || 0, color: 'bg-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  ] : [
    { icon: Users, label: 'Total Donors', value: overview.totalDonors || 0, color: 'bg-primary', bg: 'bg-red-50 dark:bg-red-900/20' },
    { icon: Heart, label: 'Lives Impacted', value: overview.livesImpacted || 0, color: 'bg-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Activity, label: 'Districts Covered', value: overview.districtsCovered || 0, color: 'bg-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: BarChart3, label: 'Blog Posts', value: overview.totalBlogPosts || 0, color: 'bg-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-base">Dashboard Overview</h1>
        <p className="text-text-muted mt-1">Welcome back, {user?.firstName}! Here is a summary of your platform.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-text-base`} />
                </div>
                <div>
                  <p className="text-sm text-text-muted font-medium">{card.label}</p>
                  <p className="text-2xl font-bold text-text-base">{card.value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts - Admin Only */}
      {isAdmin && stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly User Growth - Line Chart */}
          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
            <h3 className="text-lg font-bold text-text-base mb-4">User Growth (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.monthlyRegistrations || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="users" stroke="#C8102E" strokeWidth={2} dot={{ fill: '#C8102E', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Blood Group Distribution - Pie Chart */}
          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
            <h3 className="text-lg font-bold text-text-base mb-4">Blood Group Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.bloodGroupDistribution || []}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={{ strokeWidth: 1 }}
                >
                  {(stats.bloodGroupDistribution || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Donations - Bar Chart */}
          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm lg:col-span-2">
            <h3 className="text-lg font-bold text-text-base mb-4">Donations Fulfilled (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.monthlyDonations || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px' }} />
                <Bar dataKey="donations" fill="#C8102E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Non-admin: Simple info */}
      {!isAdmin && (
        <div className="bg-bg-surface p-8 rounded-2xl border border-border-subtle shadow-sm text-center">
          <h3 className="text-lg font-bold text-text-base mb-2">Your Contribution Matters</h3>
          <p className="text-text-muted max-w-lg mx-auto">
            Thank you for being part of the Drops community. Check your requests, update your profile, and stay available to save lives.
          </p>
        </div>
      )}
    </div>
  );
}
