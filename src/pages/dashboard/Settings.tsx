import { ThemeToggle } from '../../components/ThemeToggle';

export default function DashboardSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-base">Settings</h1>
        <p className="text-text-muted mt-1">Customize your dashboard experience.</p>
      </div>

      <div className="bg-bg-surface p-8 rounded-2xl border border-border-subtle shadow-sm space-y-8">
        <div>
          <h3 className="text-lg font-bold text-text-base mb-4">Appearance</h3>
          <div className="flex items-center justify-between p-4 bg-bg-subtle rounded-xl">
            <div>
              <p className="font-medium text-text-base">Theme</p>
              <p className="text-sm text-text-muted">Switch between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-text-base mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-bg-subtle rounded-xl">
              <div>
                <p className="font-medium text-text-base">Email Notifications</p>
                <p className="text-sm text-text-muted">Receive email alerts for urgent blood requests</p>
              </div>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" id="email-notif" />
                <label htmlFor="email-notif" className="block w-11 h-6 bg-border-strong rounded-full cursor-pointer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg-subtle rounded-xl">
              <div>
                <p className="font-medium text-text-base">SMS Notifications</p>
                <p className="text-sm text-text-muted">Get SMS alerts for critical requests in your area</p>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" id="sms-notif" />
                <label htmlFor="sms-notif" className="block w-11 h-6 bg-border-strong rounded-full cursor-pointer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-text-base mb-4">Account</h3>
          <div className="p-4 bg-bg-subtle rounded-xl">
            <p className="font-medium text-text-base mb-1">Delete Account</p>
            <p className="text-sm text-text-muted mb-4">Permanently remove your account and all associated data. This action cannot be undone.</p>
            <button className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 font-bold py-2 px-5 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition text-sm">
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
