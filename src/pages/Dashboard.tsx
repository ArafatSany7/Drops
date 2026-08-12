import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Droplet, FileText, MessageSquare, BarChart3, Settings, Menu, X, LogOut, User, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const isAdmin = user.role === 'ADMIN';

  const userMenuItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
    { to: '/dashboard/my-requests', icon: Droplet, label: 'My Requests' },
    { to: '/dashboard/profile', icon: User, label: 'Profile' },
    { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const adminMenuItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
    { to: '/dashboard/manage-users', icon: Users, label: 'Manage Users' },
    { to: '/dashboard/manage-donors', icon: Droplet, label: 'Manage Donors' },
    { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/dashboard/blog-manager', icon: FileText, label: 'Blog Posts' },
    { to: '/dashboard/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/dashboard/profile', icon: User, label: 'Profile' },
    { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const isActiveLink = (item: typeof menuItems[0]) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  return (
    <div className="flex-1 flex min-h-0">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 lg:top-[73px] left-0 z-40 h-screen lg:h-[calc(100vh-73px)] w-64 bg-bg-surface border-r border-border-subtle flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* User Info */}
        <div className="p-6 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
              {user.firstName[0]}{user.lastName?.[0] || ''}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-text-base truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-text-muted truncate">{isAdmin ? 'Administrator' : 'Donor'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const active = isActiveLink(item);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-text-muted hover:bg-bg-subtle hover:text-text-base'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {item.label}
                  {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border-subtle">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut className="w-4.5 h-4.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 bg-bg-subtle overflow-y-auto p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
