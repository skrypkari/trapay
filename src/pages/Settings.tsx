import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Globe2, 
  Building2, 
  FileText,
  Lock,
  Smartphone,
  LogOut,
  Shield,
  Bell,
  Key,
  Trash2,
  AlertTriangle,
  Check,
  X,
  Upload,
  ChevronDown
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Session {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const activeSessions: Session[] = [
    {
      id: '1',
      device: 'MacBook Pro',
      browser: 'Chrome 121.0',
      ip: '192.168.1.1',
      location: 'London, UK',
      lastActive: 'Current session',
      isCurrent: true
    },
    {
      id: '2',
      device: 'iPhone 13',
      browser: 'Safari Mobile',
      ip: '192.168.1.2',
      location: 'London, UK',
      lastActive: '2 hours ago',
      isCurrent: false
    },
    {
      id: '3',
      device: 'Windows PC',
      browser: 'Firefox 123.0',
      ip: '192.168.1.3',
      location: 'Manchester, UK',
      lastActive: '1 day ago',
      isCurrent: false
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'business', label: 'Business', icon: Building2 },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'advanced', label: 'Advanced', icon: Key }
  ];

  const notificationSettings = [
    { id: 'payment_success', label: 'Successful payment', description: 'When a payment is successfully processed' },
    { id: 'payment_failed', label: 'Failed payment', description: 'When a payment fails to process' },
    { id: 'refund', label: 'Refund processed', description: 'When a refund is issued to a customer' },
    { id: 'payout', label: 'Payout sent', description: 'When a payout is sent to your bank account' },
    { id: 'login', label: 'New login', description: 'When a new device logs into your account' },
    { id: 'api_error', label: 'API errors', description: 'When there are issues with your API integration' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center relative group">
                    <User className="h-8 w-8 text-gray-400" />
                    <button className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Upload className="h-5 w-5" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Profile Picture</h2>
                    <p className="text-sm text-gray-500">
                      Upload a profile picture or company logo
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="johndoe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="email"
                        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="john@example.com"
                      />
                      <button className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        Verify
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="tel"
                        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                      <button className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        Verify
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option>UTC (GMT+0)</option>
                      <option>Eastern Time (GMT-5)</option>
                      <option>Pacific Time (GMT-8)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Business Settings */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option>Limited Company</option>
                      <option>Sole Proprietorship</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Address
                    </label>
                    <textarea
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      rows={3}
                      placeholder="123 Business Street&#10;City, Country&#10;Postal Code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="12345678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tax ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="GB123456789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <Upload className="h-12 w-12" />
                    </div>
                    <div className="mt-4">
                      <button className="text-sm font-medium text-primary hover:text-primary-dark">
                        Upload a file
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Password Section */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Ensure your account is using a long, random password to stay secure.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Add additional security to your account using 2FA.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          is2FAEnabled ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            is2FAEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="pt-6 border-t border-gray-200">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Active Sessions</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage and logout from your active sessions on other browsers and devices.
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {activeSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white rounded-lg">
                            {session.device.includes('iPhone') ? (
                              <Smartphone className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Globe2 className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900">
                                {session.device}
                              </p>
                              {session.isCurrent && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              <p>{session.browser} • {session.ip}</p>
                              <p>{session.location} • {session.lastActive}</p>
                            </div>
                          </div>
                        </div>
                        {!session.isCurrent && (
                          <button className="text-sm text-red-600 hover:text-red-700">
                            Logout
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                      Logout of all other sessions
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose what notifications you want to receive.
                  </p>
                </div>

                <div className="space-y-4">
                  {notificationSettings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{setting.label}</p>
                        <p className="mt-1 text-sm text-gray-500">{setting.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-600">Email</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-600">SMS</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-6">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Advanced Settings */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">API Access</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage your API keys and access tokens.
                    </p>
                  </div>

                  <div className="mt-6">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                      View API Keys
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Shield className="h-5 w-5 text-yellow-500 mr-2" />
                      Danger Zone
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Irreversible and destructive actions.
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Revoke All API Keys</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            This will invalidate all existing API keys.
                          </p>
                        </div>
                        <button
                          onClick={() => setShowRevokeConfirm(true)}
                          className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                        >
                          Revoke All Keys
                        </button>
                      </div>
                    </div>

                    <div className="p-4 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-red-700">Delete Account</h3>
                          <p className="mt-1 text-sm text-red-500">
                            Once you delete your account, there is no going back.
                          </p>
                        </div>
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowDeleteConfirm(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to delete your account? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700">
                  Delete Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revoke API Keys Confirmation Modal */}
      <AnimatePresence>
        {showRevokeConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowRevokeConfirm(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mx-auto">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Revoke All API Keys</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    This will immediately invalidate all existing API keys. Your integrations will stop working until new keys are generated.
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={() => setShowRevokeConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700">
                  Revoke All Keys
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;