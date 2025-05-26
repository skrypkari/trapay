import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  Globe,
  MoreHorizontal,
  Plus,
  Lock,
  User as UserIcon,
  Mail,
  Phone,
  Settings,
  Key,
  GitBranch as BrandTelegram,
  Percent,
  Copy,
  Check,
  X,
  EyeOff,
  RefreshCw,
  Ban,
  Link as LinkIcon
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomSelect from '../components/CustomSelect';
import { format } from 'date-fns';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  status: 'active' | 'pending' | 'suspended';
  balance: number;
  joinDate: Date;
  lastActive: Date;
  telegramId?: string;
  merchantUrl?: string;
  commission: {
    rate: number;
    enabled: boolean;
  };
  gateways: string[];
  apiKey?: {
    key: string;
    enabled: boolean;
    lastUsed?: Date;
  };
}

const sampleUsers: User[] = [
  {
    id: 'USER-1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    status: 'active',
    balance: 1250.50,
    joinDate: new Date('2024-01-15'),
    lastActive: new Date('2024-03-10T14:30:00'),
    telegramId: '@johndoe',
    merchantUrl: 'https://store.johndoe.com',
    commission: {
      rate: 0.5,
      enabled: true
    },
    gateways: ['Stripe', 'PayPal'],
    apiKey: {
      key: 'sk_test_123456789',
      enabled: true,
      lastUsed: new Date('2024-03-10T12:00:00')
    }
  },
  {
    id: 'USER-2',
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane.smith@example.com',
    status: 'pending',
    balance: 500.75,
    joinDate: new Date('2024-02-20'),
    lastActive: new Date('2024-03-09T09:15:00'),
    merchantUrl: 'https://janesmith.store',
    commission: {
      rate: 0.3,
      enabled: true
    },
    gateways: ['Stripe']
  }
];

interface AddUserFormData {
  email: string;
  fullName: string;
  username: string;
  telegramId?: string;
  merchantUrl?: string;
  commission: number;
  gateways: string[];
}

const CreateUserModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddUserFormData) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<AddUserFormData>({
    email: '',
    fullName: '',
    username: '',
    telegramId: '',
    merchantUrl: '',
    commission: 0.5,
    gateways: []
  });

  const gatewayOptions = [
    { value: 'Stripe', label: 'Stripe' },
    { value: 'PayPal', label: 'PayPal' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Create New User</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Merchant URL
                  </label>
                  <input
                    type="url"
                    value={formData.merchantUrl}
                    onChange={(e) => setFormData({ ...formData, merchantUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telegram ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.telegramId}
                    onChange={(e) => setFormData({ ...formData, telegramId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Gateways
                  </label>
                  <CustomSelect
                    value={formData.gateways.join(',')}
                    onChange={(value) => setFormData({ ...formData, gateways: value.split(',') })}
                    options={gatewayOptions}
                    placeholder="Select gateways"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark"
                >
                  Create User
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const UserDetailsModal: React.FC<{
  user: User;
  onClose: () => void;
  onUpdate: (userId: string, data: Partial<User>) => void;
  onResetPassword: (userId: string) => void;
  onSuspendUser: (userId: string) => void;
  onUnsuspendUser: (userId: string) => void;
}> = ({ user, onClose, onUpdate, onResetPassword, onSuspendUser, onUnsuspendUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    telegramId: user.telegramId || '',
    merchantUrl: user.merchantUrl || '',
    commission: user.commission.rate,
    gateways: user.gateways
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showPasswordResetConfirm, setShowPasswordResetConfirm] = useState(false);
  const [showSuspendConfirm, setShowSuspendConfirm] = useState(false);

  const gatewayOptions = [
    { value: 'Stripe', label: 'Stripe' },
    { value: 'PayPal', label: 'PayPal' },
    { value: 'Square', label: 'Square' }
  ];

  const handleSave = () => {
    onUpdate(user.id, {
      name: formData.name,
      username: formData.username,
      telegramId: formData.telegramId,
      merchantUrl: formData.merchantUrl,
      commission: {
        ...user.commission,
        rate: formData.commission
      },
      gateways: formData.gateways
    });
    setEditMode(false);
  };

  const handleCopyApiKey = () => {
    if (user.apiKey) {
      navigator.clipboard.writeText(user.apiKey.key);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const handleResetApiKey = () => {
    if (user.apiKey) {
      onUpdate(user.id, {
        apiKey: {
          ...user.apiKey,
          key: `sk_test_${Math.random().toString(36).substr(2, 9)}`
        }
      });
    }
  };

  const handleToggleApiKey = () => {
    if (user.apiKey) {
      onUpdate(user.id, {
        apiKey: {
          ...user.apiKey,
          enabled: !user.apiKey.enabled
        }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <UserIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
                <p className="text-sm text-gray-500">{user.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{user.name}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{user.username}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="text-sm text-gray-900">{user.email}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Merchant URL
                </label>
                {editMode ? (
                  <input
                    type="url"
                    value={formData.merchantUrl}
                    onChange={(e) => setFormData({ ...formData, merchantUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="https://example.com"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4 text-gray-400" />
                    <a 
                      href={user.merchantUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {user.merchantUrl || 'Not set'}
                    </a>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telegram ID
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.telegramId}
                    onChange={(e) => setFormData({ ...formData, telegramId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="@username"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{user.telegramId || 'Not set'}</div>
                )}
              </div>
            </div>

            {/* Commission and Gateways */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commission Rate
                </label>
                {editMode ? (
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.commission}
                      onChange={(e) => setFormData({ ...formData, commission: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary pr-8"
                      step="0.1"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-900">{user.commission.rate}%</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Gateways
                </label>
                {editMode ? (
                  <CustomSelect
                    value={formData.gateways.join(',')}
                    onChange={(value) => setFormData({ ...formData, gateways: value.split(',') })}
                    options={gatewayOptions}
                    placeholder="Select gateways"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.gateways.map((gateway) => (
                      <span
                        key={gateway}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {gateway}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' :
                  user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </div>
              </div>
            </div>
          </div>

          {/* API Key Management */}
          {user.apiKey && (
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">API Key Management</h4>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">API Key</div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopyApiKey}
                        className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {showCopied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={handleResetApiKey}
                        className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 font-mono text-sm break-all relative">
                    {showApiKey ? user.apiKey.key : '•'.repeat(40)}
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Last used: {user.apiKey.lastUsed ? format(user.apiKey.lastUsed, 'MMM d, yyyy HH:mm') : 'Never'}
                    </div>
                    <button
                      onClick={handleToggleApiKey}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        user.apiKey.enabled ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          user.apiKey.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 flex flex-wrap gap-3">
            {editMode ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordResetConfirm(true)}
                  className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100"
                >
                  Reset Password
                </button>
                {user.status !== 'suspended' ? (
                  <button
                    type="button"
                    onClick={() => setShowSuspendConfirm(true)}
                    className="px-4 py-2 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100"
                  >
                    Suspend Account
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onUnsuspendUser(user.id)}
                    className="px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100"
                  >
                    Unsuspend Account
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Password Reset Confirmation Modal */}
        <AnimatePresence>
          {showPasswordResetConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowPasswordResetConfirm(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mx-auto">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Are you sure you want to reset the password for this user? They will receive an email with instructions to set a new password.
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowPasswordResetConfirm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onResetPassword(user.id);
                      setShowPasswordResetConfirm(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                  >
                    Reset Password
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suspend Account Confirmation Modal */}
        <AnimatePresence>
          {showSuspendConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowSuspendConfirm(false);
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
                    <Ban className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">Suspend Account</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Are you sure you want to suspend this user's account? They will not be able to access their account or process any transactions until the account is unsuspended.
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowSuspendConfirm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onSuspendUser(user.id);
                      setShowSuspendConfirm(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
                  >
                    Suspend Account
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4 text-yellow-600" /> },
    { value: 'suspended', label: 'Suspended', icon: <XCircle className="h-4 w-4 text-red-600" /> }
  ];

  const handleUpdateUser = (userId: string, data: Partial<User>) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...data } : user
    ));
  };

  const handleResetPassword = (userId: string) => {
    // In a real application, this would trigger a password reset email
    console.log(`Password reset requested for user ${userId}`);
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: 'suspended' } : user
    ));
  };

  const handleUnsuspendUser = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: 'active' } : user
    ));
  };

  const handleCreateUser = (data: AddUserFormData) => {
    const newUser: User = {
      id: `USER-${Math.random().toString(36).substr(2, 9)}`,
      name: data.fullName,
      username: data.username,
      email: data.email,
      status: 'active',
      balance: 0,
      joinDate: new Date(),
      lastActive: new Date(),
      telegramId: data.telegramId,
      merchantUrl: data.merchantUrl,
      commission: {
        rate: data.commission,
        enabled: true
      },
      gateways: data.gateways
    };

    setUsers([newUser, ...users]);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserIcon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">1,234</h3>
            <p className="text-sm text-gray-500 mt-1">Total Users</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8.2%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">956</h3>
            <p className="text-sm text-gray-500 mt-1">Active Users</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">+5.3%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">89</h3>
            <p className="text-sm text-gray-500 mt-1">Pending Users</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-50 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">-2.3%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">23</h3>
            <p className="text-sm text-gray-500 mt-1">Suspended Users</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <CustomSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                placeholder="Filter by status"
                className="w-[180px]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>User</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Commission</span>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Gateways</span>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">API Access</span>
                </th>
                <th className="text-left px-6 py-4">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>Joined</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="w-[50px]"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.status === 'active' && (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Active</span>
                      </div>
                    )}
                    {user.status === 'pending' && (
                      <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Pending</span>
                      </div>
                    )}
                    {user.status === 'suspended' && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg w-fit">
                        <Ban className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Suspended</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Percent className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{user.commission.rate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.gateways.map((gateway) => (
                        <span
                          key={gateway}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          {gateway}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.apiKey ? (
                      <div className={`flex items-center space-x-2 ${
                        user.apiKey.enabled ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <Key className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {user.apiKey.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not configured</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {format(user.joinDate, 'MMM d, yyyy')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onUpdate={handleUpdateUser}
            onResetPassword={handleResetPassword}
            onSuspendUser={handleSuspendUser}
            onUnsuspendUser={handleUnsuspendUser}
          />
        )}
        {isCreateModalOpen && (
          <CreateUserModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;