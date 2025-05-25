import React, { useState } from 'react';
import {
  Search,
  Filter,
  Calendar,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  DollarSign,
  ArrowDownLeft,
  AlertTriangle,
  Check,
  X,
  ChevronDown,
  Wallet,
  Building2,
  CreditCard,
  Bitcoin
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomSelect from '../components/CustomSelect';
import DatePicker from '../components/DatePicker';

interface Payout {
  id: string;
  user: {
    name: string;
    email: string;
  };
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'declined';
  requestDate: Date;
  method: {
    type: 'bank' | 'card' | 'crypto';
    details: string;
  };
}

const samplePayouts: Payout[] = [
  {
    id: 'PO-001',
    user: {
      name: 'John Smith',
      email: 'john@example.com'
    },
    amount: 1500.00,
    currency: 'USD',
    status: 'pending',
    requestDate: new Date('2024-03-20 14:30:00'),
    method: {
      type: 'bank',
      details: '****1234'
    }
  },
  {
    id: 'PO-002',
    user: {
      name: 'Alice Johnson',
      email: 'alice@example.com'
    },
    amount: 2750.50,
    currency: 'USD',
    status: 'approved',
    requestDate: new Date('2024-03-20 13:15:00'),
    method: {
      type: 'card',
      details: '****5678'
    }
  },
  {
    id: 'PO-003',
    user: {
      name: 'Bob Wilson',
      email: 'bob@example.com'
    },
    amount: 500.00,
    currency: 'USD',
    status: 'declined',
    requestDate: new Date('2024-03-20 12:45:00'),
    method: {
      type: 'crypto',
      details: '0x1234...5678'
    }
  }
];

const PayoutDetailsModal: React.FC<{
  payout: Payout;
  onClose: () => void;
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
}> = ({ payout, onClose, onApprove, onDecline }) => {
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
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Payout Details</h3>
              <p className="text-sm text-gray-500">{payout.id}</p>
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
              <div>
                <p className="text-sm font-medium text-gray-500">Amount</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${payout.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                {payout.status === 'approved' && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium capitalize">Approved</span>
                  </div>
                )}
                {payout.status === 'pending' && (
                  <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium capitalize">Pending</span>
                  </div>
                )}
                {payout.status === 'declined' && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg w-fit">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm font-medium capitalize">Declined</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Payout Method</p>
                <div className="flex items-center space-x-2 mt-1">
                  {payout.method.type === 'bank' && <Building2 className="h-4 w-4 text-gray-400" />}
                  {payout.method.type === 'card' && <CreditCard className="h-4 w-4 text-gray-400" />}
                  {payout.method.type === 'crypto' && <Bitcoin className="h-4 w-4 text-gray-400" />}
                  <span className="text-sm text-gray-900">
                    {payout.method.type.charAt(0).toUpperCase() + payout.method.type.slice(1)} - {payout.method.details}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">User</p>
                <p className="text-sm font-medium text-gray-900">{payout.user.name}</p>
                <p className="text-sm text-gray-500">{payout.user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Request Date</p>
                <p className="text-sm text-gray-900">
                  {payout.requestDate.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {payout.status === 'pending' && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => onDecline(payout.id)}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => onApprove(payout.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdminPayouts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4 text-yellow-600" /> },
    { value: 'approved', label: 'Approved', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { value: 'declined', label: 'Declined', icon: <XCircle className="h-4 w-4 text-red-600" /> }
  ];

  const handleApprove = (id: string) => {
    // Handle payout approval
    console.log('Approving payout:', id);
    setSelectedPayout(null);
  };

  const handleDecline = (id: string) => {
    // Handle payout decline
    console.log('Declining payout:', id);
    setSelectedPayout(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Payouts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage withdrawal requests from users
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">$45,231</h3>
            <p className="text-sm text-gray-500 mt-1">Total Payouts</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">+8.2%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">89</h3>
            <p className="text-sm text-gray-500 mt-1">Pending Requests</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+5.3%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">1,234</h3>
            <p className="text-sm text-gray-500 mt-1">Approved Payouts</p>
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
            <p className="text-sm text-gray-500 mt-1">Declined Requests</p>
          </div>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200">
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
            <div className="flex flex-col sm:flex-row gap-4">
              <CustomSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                placeholder="Filter by status"
                className="w-full sm:w-[180px]"
              />
              <div className="flex gap-4">
                <div className="relative">
                  <button
                    onClick={() => setIsStartDatePickerOpen(true)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-left flex items-center space-x-3 hover:border-primary transition-all duration-200"
                  >
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className={startDate ? 'text-gray-900' : 'text-gray-500'}>
                      {startDate ? startDate.toLocaleDateString() : 'Start date'}
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
                      {endDate ? endDate.toLocaleDateString() : 'End date'}
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
                    <span>ID</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">User</span>
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
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>Request Date</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Method</span>
                </th>
                <th className="text-right px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {samplePayouts.map((payout) => (
                <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{payout.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payout.user.name}</div>
                      <div className="text-sm text-gray-500">{payout.user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      ${payout.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {payout.status === 'approved' && (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Approved</span>
                      </div>
                    )}
                    {payout.status === 'pending' && (
                      <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Pending</span>
                      </div>
                    )}
                    {payout.status === 'declined' && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg w-fit">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Declined</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {payout.requestDate.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {payout.method.type === 'bank' && <Building2 className="h-4 w-4 text-gray-400" />}
                      {payout.method.type === 'card' && <CreditCard className="h-4 w-4 text-gray-400" />}
                      {payout.method.type === 'crypto' && <Bitcoin className="h-4 w-4 text-gray-400" />}
                      <span className="text-sm text-gray-500">{payout.method.details}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedPayout(payout)}
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

      <AnimatePresence>
        {selectedPayout && (
          <PayoutDetailsModal
            payout={selectedPayout}
            onClose={() => setSelectedPayout(null)}
            onApprove={handleApprove}
            onDecline={handleDecline}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPayouts;