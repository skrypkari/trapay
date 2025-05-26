import React, { useState } from 'react';
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
  CreditCard,
  AlertCircle,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from '../components/DatePicker';
import CustomSelect from '../components/CustomSelect';

interface Payout {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  method: {
    type: 'crypto';
    details: string;
  };
  status: 'processing' | 'paid' | 'failed' | 'cancelled';
  fee: number;
}

const samplePayouts: Payout[] = [
  {
    id: 'PO-001',
    date: new Date('2024-03-20'),
    amount: 5000.00,
    currency: 'USD',
    method: {
      type: 'crypto',
      details: 'USDT TRC-20'
    },
    status: 'paid',
    fee: 25.00
  },
  {
    id: 'PO-002',
    date: new Date('2024-03-19'),
    amount: 2500.00,
    currency: 'USD',
    method: {
      type: 'crypto',
      details: 'USDT Polygon'
    },
    status: 'processing',
    fee: 12.50
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
              <X className="h-5 w-5" />
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
                  <Bitcoin className="h-4 w-4 text-gray-400" />
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

const Payouts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'processing', label: 'Processing', icon: <Clock className="h-4 w-4 text-blue-600" /> },
    { value: 'paid', label: 'Paid', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { value: 'failed', label: 'Failed', icon: <AlertCircle className="h-4 w-4 text-red-600" /> },
    { value: 'cancelled', label: 'Cancelled', icon: <XCircle className="h-4 w-4 text-gray-600" /> }
  ];

  // Calculate totals
  const totalBalance = 45231.00;
  const totalPaidOut = 128450.00;
  const awaitingPayout = 24500.00;
  const thisMonth = 24500.00;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Payouts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your payouts and withdrawals
          </p>
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
              <p className="text-lg md:text-2xl font-semibold text-gray-900">${totalBalance.toLocaleString()}</p>
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
              <p className="text-lg md:text-2xl font-semibold text-gray-900">${totalPaidOut.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 md:p-3 bg-yellow-50 rounded-xl">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Awaiting Payout</p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">${awaitingPayout.toLocaleString()}</p>
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
              <p className="text-lg md:text-2xl font-semibold text-gray-900">${thisMonth.toLocaleString()}</p>
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
                <div>
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
                <div>
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
              {samplePayouts.map((payout) => (
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
      </AnimatePresence>
    </div>
  );
};

export default Payouts;