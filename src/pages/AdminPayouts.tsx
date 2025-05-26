import React, { useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowUpDown,
  Calendar,
  Download,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ArrowDownLeft,
  Wallet
} from 'lucide-react';
import DatePicker from '../components/DatePicker';
import CustomSelect from '../components/CustomSelect';

interface Payout {
  id: string;
  date: Date;
  username: string;
  amount: number;
  currency: string;
  walletAddress: string;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'cancelled';
}

const samplePayouts: Payout[] = [
  {
    id: 'PO-001',
    date: new Date('2024-03-20'),
    username: 'johndoe',
    amount: 5000.00,
    currency: 'USD',
    walletAddress: '0x1234...5678',
    status: 'paid'
  },
  {
    id: 'PO-002',
    date: new Date('2024-03-19'),
    username: 'alice_smith',
    amount: 2500.00,
    currency: 'USD',
    walletAddress: '0x8765...4321',
    status: 'processing'
  },
  {
    id: 'PO-003',
    date: new Date('2024-03-18'),
    username: 'bob_wilson',
    amount: 1000.00,
    currency: 'USD',
    walletAddress: '0x9876...5432',
    status: 'pending'
  }
];

interface CreatePayoutFormData {
  username: string;
  amount: string;
  currency: string;
  walletAddress: string;
  notes?: string;
}

const CreatePayoutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePayoutFormData) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CreatePayoutFormData>({
    username: '',
    amount: '',
    currency: 'USD',
    walletAddress: '',
    notes: ''
  });

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' }
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
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full pl-4 pr-20 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="0.00"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <CustomSelect
                        value={formData.currency}
                        onChange={(value) => setFormData({ ...formData, currency: value })}
                        options={currencyOptions}
                        placeholder="Currency"
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.walletAddress}
                    onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Enter wallet address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                    rows={3}
                    placeholder="Add any additional notes..."
                  />
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
                <div className="text-sm font-medium text-gray-500 mb-1">Username</div>
                <div className="text-sm text-gray-900">{payout.username}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Wallet Address</div>
                <div className="text-sm font-mono text-gray-900">{payout.walletAddress}</div>
              </div>
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
                <div className="text-sm font-medium text-gray-500 mb-1">Date</div>
                <div className="text-sm text-gray-900">
                  {format(payout.date, 'PPpp')}
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
    const newPayout: Payout = {
      id: `PO-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date(),
      username: data.username,
      amount: parseFloat(data.amount),
      currency: data.currency,
      walletAddress: data.walletAddress,
      status: 'pending'
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
                  <span className="text-sm font-medium text-gray-500">Username</span>
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
                  <span className="text-sm font-medium text-gray-500">Wallet Address</span>
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
                    <span className="text-sm text-gray-900">{payout.username}</span>
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
                    <span className="text-sm font-mono text-gray-500">{payout.walletAddress}</span>
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