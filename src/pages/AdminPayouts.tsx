import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowDownLeft,
  AlertTriangle,
  Download,
  DollarSign,
  Wallet,
  Building2,
  Bitcoin,
  Plus,
  User,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from '../components/DatePicker';
import CustomSelect from '../components/CustomSelect';

// Sample users data
const sampleUsers = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com',
    balance: 15000.00,
    availableForPayout: 12500.00,
    wallets: {
      'USDT TRC-20': 'TRx4d7a8b9c0...',
      'USDT Polygon': '0x1234...',
      'USDT Ethereum': '0x5678...',
      'USDC Polygon': '0x9abc...'
    }
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com',
    balance: 8000.00,
    availableForPayout: 7500.00,
    wallets: {
      'USDT TRC-20': 'TRx1a2b3c4d...',
      'USDT Polygon': '0xdef0...',
      'USDC Polygon': '0x1a2b...'
    }
  }
];

interface CreatePayoutFormData {
  userId: string;
  amount: string;
  network: string;
}

const networkOptions = [
  { value: 'USDT TRC-20', label: 'USDT TRC-20' },
  { value: 'USDT Polygon', label: 'USDT Polygon' },
  { value: 'USDT Ethereum', label: 'USDT Ethereum' },
  { value: 'USDC Polygon', label: 'USDC Polygon' }
];

const CreatePayoutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePayoutFormData) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof sampleUsers[0] | null>(null);
  const [formData, setFormData] = useState<CreatePayoutFormData>({
    userId: '',
    amount: '',
    network: 'USDT TRC-20'
  });
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const filteredUsers = sampleUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user: typeof sampleUsers[0]) => {
    setSelectedUser(user);
    setFormData(prev => ({ ...prev, userId: user.id }));
    setShowUserDropdown(false);
    setSearchTerm(`${user.name} (${user.email})`);
  };

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
                    <ArrowDownLeft className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Create Payout</h3>
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
                    Search User
                  </label>
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowUserDropdown(true);
                          setSelectedUser(null);
                        }}
                        onClick={() => setShowUserDropdown(true)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="Search by name or email"
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    
                    {showUserDropdown && filteredUsers.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                        {filteredUsers.map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => handleUserSelect(user)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-medium text-primary">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {selectedUser && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-500 mb-1">Balance</div>
                      <div className="text-lg font-semibold text-gray-900">
                        ${selectedUser.balance.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-500 mb-1">Available for Payout</div>
                      <div className="text-lg font-semibold text-green-600">
                        ${selectedUser.availableForPayout.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Network
                  </label>
                  <CustomSelect
                    value={formData.network}
                    onChange={(value) => setFormData({ ...formData, network: value })}
                    options={networkOptions}
                    placeholder="Select network"
                  />
                </div>

                {selectedUser && formData.network && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-2">Wallet Address</div>
                    <div className="font-mono text-sm text-gray-900">
                      {selectedUser.wallets[formData.network as keyof typeof selectedUser.wallets] || 'No wallet set for this network'}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary pr-16"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max={selectedUser?.availableForPayout}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500">
                        {formData.network?.split(' ')[0] || 'USDT'}
                      </span>
                    </div>
                  </div>
                  {selectedUser && (
                    <p className="mt-1 text-sm text-gray-500">
                      Maximum amount: ${selectedUser.availableForPayout.toLocaleString()}
                    </p>
                  )}
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
                  disabled={!selectedUser || !formData.network || !formData.amount}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Payout
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface Payout {
  id: string;
  date: Date;
  username: string;
  amount: number;
  currency: string;
  walletAddress: string;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'cancelled';
  fee: number;
  method: {
    type: 'bank' | 'card' | 'crypto';
    details: string;
  };
}

const samplePayouts: Payout[] = [
  {
    id: 'PO-001',
    date: new Date('2024-03-20'),
    username: 'johndoe',
    amount: 5000.00,
    currency: 'USD',
    walletAddress: '0x1234...5678',
    status: 'paid',
    fee: 25.00,
    method: {
      type: 'crypto',
      details: 'USDT TRC-20'
    }
  },
  {
    id: 'PO-002',
    date: new Date('2024-03-19'),
    username: 'alice_smith',
    amount: 2500.00,
    currency: 'USD',
    walletAddress: '0x8765...4321',
    status: 'processing',
    fee: 12.50,
    method: {
      type: 'crypto',
      details: 'USDT Polygon'
    }
  },
  {
    id: 'PO-003',
    date: new Date('2024-03-18'),
    username: 'bob_wilson',
    amount: 1000.00,
    currency: 'USD',
    walletAddress: '0x9876...5432',
    status: 'pending',
    fee: 5.00,
    method: {
      type: 'crypto',
      details: 'USDC Polygon'
    }
  }
];

const PayoutDetailsModal: React.FC<{
  payout: Payout;
  onClose: () => void;
}> = ({ payout, onClose }) => {
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
                <ArrowDownLeft className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payout Details</h3>
                <p className="text-sm text-gray-500">{format(payout.date, 'PPpp')}</p>
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
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
                <div className="mt-1">
                  {payout.status === 'paid' && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Paid</span>
                    </div>
                  )}
                  {payout.status === 'processing' && (
                    <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg w-fit">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Processing</span>
                    </div>
                  )}
                  {payout.status === 'pending' && (
                    <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Pending</span>
                    </div>
                  )}
                  {payout.status === 'failed' && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg w-fit">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Failed</span>
                    </div>
                  )}
                  {payout.status === 'cancelled' && (
                    <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-1 rounded-lg w-fit">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Cancelled</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Method</div>
                <div className="flex items-center space-x-2">
                  {payout.method.type === 'bank' && <Building2 className="h-4 w-4 text-gray-400" />}
                  {payout.method.type === 'crypto' && <Bitcoin className="h-4 w-4 text-gray-400" />}
                  <span className="text-sm text-gray-900">{payout.method.details}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Amount</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {payout.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: payout.currency,
                  })}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Fee</div>
                <div className="text-lg font-medium text-gray-900">
                  {payout.fee.toLocaleString('en-US', {
                    style: 'currency',
                    currency: payout.currency,
                  })}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Net Amount</div>
                <div className="text-lg font-medium text-gray-900">
                  {(payout.amount - payout.fee).toLocaleString('en-US', {
                    style: 'currency',
                    currency: payout.currency,
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdminPayouts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [payouts, setPayouts] = useState<Payout[]>(samplePayouts);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4 text-yellow-600" /> },
    { value: 'processing', label: 'Processing', icon: <Clock className="h-4 w-4 text-blue-600" /> },
    { value: 'paid', label: 'Paid', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { value: 'failed', label: 'Failed', icon: <AlertCircle className="h-4 w-4 text-red-600" /> },
    { value: 'cancelled', label: 'Cancelled', icon: <XCircle className="h-4 w-4 text-gray-600" /> }
  ];

  const handleCreatePayout = (data: CreatePayoutFormData) => {
    const selectedUser = sampleUsers.find(u => u.id === data.userId);
    const newPayout: Payout = {
      id: `PO-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date(),
      username: selectedUser?.name || '',
      amount: parseFloat(data.amount),
      currency: data.network.split(' ')[0],
      walletAddress: selectedUser?.wallets[data.network] || '',
      status: 'pending',
      fee: parseFloat(data.amount) * 0.005, // 0.5% fee
      method: {
        type: 'crypto',
        details: data.network
      }
    };

    setPayouts([newPayout, ...payouts]);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Payouts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and process payouts
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
            Create Payout
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 md:p-3 bg-primary/10 rounded-xl">
              <Wallet className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">$45,231</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 md:p-3 bg-green-50 rounded-xl">
              <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Paid Out</p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">$128,450</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 md:p-3 bg-yellow-50 rounded-xl">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">$3,500</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 md:p-3 bg-blue-50 rounded-xl">
              <ArrowDownLeft className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">$24,500</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search payouts..."
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
                placeholder="All Status"
                className="w-[180px]"
              />
              <div className="flex gap-4">
                <div className="relative">
                  <button
                    onClick={() => setIsStartDatePickerOpen(true)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-left flex items-center space-x-3 hover:border-primary transition-all duration-200"
                  >
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className={startDate ? 'text-gray-900' : 'text-gray-500'}>
                      {startDate ? format(startDate, 'MMM d, yyyy') : 'Start date'}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isStartDatePickerOpen && (
                      <DatePicker
                        value={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          setIsStartDatePickerOpen(false);
                        }}
                        onClose={() => setIsStartDatePickerOpen(false)}
                      />
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsEndDatePickerOpen(true)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-left flex items-center space-x-3 hover:border-primary transition-all duration-200"
                  >
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className={endDate ? 'text-gray-900' : 'text-gray-500'}>
                      {endDate ? format(endDate, 'MMM d, yyyy') : 'End date'}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isEndDatePickerOpen && (
                      <DatePicker
                        value={endDate}
                        onChange={(date) => {
                          setEndDate(date);
                          setIsEndDatePickerOpen(false);
                        }}
                        onClose={() => setIsEndDatePickerOpen(false)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>Date</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left px-6 py-4">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>Amount</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Fee</span>
                </th>
                <th className="text-right px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {format(payout.date, 'MMM d, yyyy')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      ${payout.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {payout.status === 'paid' && (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Paid</span>
                      </div>
                    )}
                    {payout.status === 'processing' && (
                      <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg w-fit">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Processing</span>
                      </div>
                    )}
                    {payout.status === 'pending' && (
                      <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Pending</span>
                      </div>
                    )}
                    {payout.status === 'failed' && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg w-fit">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Failed</span>
                      </div>
                    )}
                    {payout.status === 'cancelled' && (
                      <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-1 rounded-lg w-fit">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Cancelled</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">${payout.fee.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedPayout(payout)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedPayout && (
          <PayoutDetailsModal
            payout={selectedPayout}
            onClose={() => setSelectedPayout(null)}
          />
        )}
        {isCreateModalOpen && (
          <CreatePayoutModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreatePayout}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPayouts;