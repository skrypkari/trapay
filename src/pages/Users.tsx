import React, { useState } from 'react';
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  Shield,
  AlertTriangle,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle2,
  XCircle,
  Clock,
  Wallet,
  ArrowUpDown,
  Mail,
  Phone,
  Calendar,
  MapPin,
  RefreshCw,
  Plus,
  Lock,
  User as UserIcon
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomSelect from '../components/CustomSelect';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'suspended';
  balance: number;
  joinDate: Date;
  lastActive: Date;
}

// Sample user data for development
const sampleUsers: User[] = [
  {
    id: 'USER-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active',
    balance: 1250.50,
    joinDate: new Date('2024-01-15'),
    lastActive: new Date('2024-03-10T14:30:00')
  },
  {
    id: 'USER-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'pending',
    balance: 500.75,
    joinDate: new Date('2024-02-20'),
    lastActive: new Date('2024-03-09T09:15:00')
  },
  {
    id: 'USER-3',
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    status: 'suspended',
    balance: 0,
    joinDate: new Date('2023-12-01'),
    lastActive: new Date('2024-03-01T16:45:00')
  },
  {
    id: 'USER-4',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    status: 'active',
    balance: 3420.25,
    joinDate: new Date('2024-01-05'),
    lastActive: new Date('2024-03-10T11:20:00')
  },
  {
    id: 'USER-5',
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    status: 'active',
    balance: 750.00,
    joinDate: new Date('2024-02-10'),
    lastActive: new Date('2024-03-09T17:50:00')
  }
];

interface AddUserFormData {
  email: string;
  fullName: string;
  password: string;
}

const AddUserModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddUserFormData) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<AddUserFormData>({
    email: '',
    fullName: '',
    password: '',
  });

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
                  <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="user@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
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
                  Add User
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
}> = ({ user, onClose }) => {
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
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-primary">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Join Date</p>
                  <p className="text-sm text-gray-900">{user.joinDate.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Last Active</p>
                  <p className="text-sm text-gray-900">{user.lastActive.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Account Status</p>
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
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Balance</p>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-lg w-fit">
                  <Wallet className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    ${user.balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <Mail className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Send Email</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <Ban className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Suspend</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <RefreshCw className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Reset 2FA</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(sampleUsers);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4 text-yellow-600" /> },
    { value: 'suspended', label: 'Suspended', icon: <Ban className="h-4 w-4 text-red-600" /> }
  ];

  const handleAddUser = (data: AddUserFormData) => {
    const newUser: User = {
      id: `USER-${Math.random().toString(36).substr(2, 9)}`,
      name: data.fullName,
      email: data.email,
      status: 'pending',
      balance: 0,
      joinDate: new Date(),
      lastActive: new Date()
    };

    setUsers([newUser, ...users]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Users</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage user accounts and permissions
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddUserModalOpen(true)}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-50 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+12.5%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900">1,234</h3>
              <p className="text-sm text-gray-500 mt-1">Active Users</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-yellow-600">+5.2%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900">89</h3>
              <p className="text-sm text-gray-500 mt-1">Pending Users</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-red-50 rounded-lg">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-medium text-red-600">-2.3%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900">23</h3>
              <p className="text-sm text-gray-500 mt-1">Suspended Users</p>
            </div>
          </div>
        </div>

        {/* Users Table */}
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
              <div className="flex flex-col sm:flex-row gap-4">
                <CustomSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={statusOptions}
                  placeholder="Filter by status"
                  className="w-full sm:w-[180px]"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full">
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
                      <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                        <span>Balance</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </th>
                    <th className="text-left px-6 py-4">
                      <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                        <span>Joined</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </th>
                    <th className="text-left px-6 py-4">
                      <span className="text-sm font-medium text-gray-500">Last Active</span>
                    </th>
                    <th className="text-right px-6 py-4"></th>
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
                        <span className="text-sm font-medium text-gray-900">
                          ${user.balance.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">
                          {user.joinDate.toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">
                          {user.lastActive.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
        {isAddUserModalOpen && (
          <AddUserModal
            isOpen={isAddUserModalOpen}
            onClose={() => setIsAddUserModalOpen(false)}
            onSubmit={handleAddUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;