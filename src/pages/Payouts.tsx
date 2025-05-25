import React, { useState } from 'react';
import {
  ArrowDownLeft,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  CreditCard,
  Wallet,
  Building2,
  Bitcoin,
  Search,
  Filter,
  Eye,
  Download,
  Copy,
  MoreHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from '../components/DatePicker';

interface Payout {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  recipient: {
    name: string;
    type: 'bank' | 'card' | 'crypto';
    details: string;
  };
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'cancelled';
  fee: number;
}

const samplePayouts: Payout[] = [
  {
    id: 'PO-001',
    date: new Date('2024-03-20'),
    amount: 5000.00,
    currency: 'USD',
    recipient: {
      name: 'John Smith',
      type: 'bank',
      details: '****1234'
    },
    status: 'paid',
    fee: 25.00
  },
  {
    id: 'PO-002',
    date: new Date('2024-03-19'),
    amount: 2500.00,
    currency: 'USD',
    recipient: {
      name: 'Alice Johnson',
      type: 'card',
      details: '****5678'
    },
    status: 'processing',
    fee: 12.50
  },
  {
    id: 'PO-003',
    date: new Date('2024-03-18'),
    amount: 1000.00,
    currency: 'USD',
    recipient: {
      name: 'Crypto Wallet',
      type: 'crypto',
      details: '0x1234...5678'
    },
    status: 'pending',
    fee: 5.00
  }
];

const CustomSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  placeholder: string;
  className?: string;
}> = ({ value, onChange, options, placeholder, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 group"
      >
        {value ? (
          <span className="flex items-center space-x-2">
            {options.find(opt => opt.value === value)?.icon}
            <span>{options.find(opt => opt.value === value)?.label}</span>
          </span>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-40 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-1"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-50 ${
                    value === option.value ? 'text-primary bg-primary/5' : 'text-gray-700'
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const PayoutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [recipientType, setRecipientType] = useState<'bank' | 'card' | 'crypto'>('bank');
  const [schedule, setSchedule] = useState('immediate');
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create Payout</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Amount and Currency */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <CustomSelect
                    value={currency}
                    onChange={setCurrency}
                    options={currencyOptions}
                    placeholder="Currency"
                    className="w-32"
                  />
                </div>
              </div>

              {/* Recipient Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Recipient Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setRecipientType('bank')}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border outline-none ${
                      recipientType === 'bank'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-primary/20'
                    }`}
                  >
                    <Building2 className="h-6 w-6 mb-2" />
                    <span className="text-sm">Bank Account</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecipientType('card')}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border outline-none ${
                      recipientType === 'card'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-primary/20'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 mb-2" />
                    <span className="text-sm">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecipientType('crypto')}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border outline-none ${
                      recipientType === 'crypto'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-primary/20'
                    }`}
                  >
                    <Bitcoin className="h-6 w-6 mb-2" />
                    <span className="text-sm">Crypto</span>
                  </button>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Schedule
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={schedule === 'immediate'}
                      onChange={() => setSchedule('immediate')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-900">Immediate payout</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={schedule === 'scheduled'}
                      onChange={() => setSchedule('scheduled')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-900">Schedule for later</span>
                  </label>
                  {schedule === 'scheduled' && (
                    <div className="relative ml-6">
                      <button
                        type="button"
                        onClick={() => setIsDatePickerOpen(true)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-left flex items-center space-x-3 hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className={scheduleDate ? 'text-gray-900' : 'text-gray-500'}>
                          {scheduleDate ? format(scheduleDate, 'MMM d, yyyy') : 'Select date'}
                        </span>
                      </button>
                      <AnimatePresence>
                        {isDatePickerOpen && (
                          <DatePicker
                            value={scheduleDate}
                            onChange={(date) => {
                              setScheduleDate(date);
                              setIsDatePickerOpen(false);
                            }}
                            onClose={() => setIsDatePickerOpen(false)}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark outline-none"
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
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <ArrowDownLeft className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Payout Details
              </h3>
              <p className="text-sm text-gray-500">
                {format(payout.date, 'PPpp')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Payout ID</div>
                <div className="text-sm text-gray-900 font-mono flex items-center justify-between">
                  {payout.id}
                  <button className="text-primary hover:text-primary-dark p-1 hover:bg-primary/5 rounded-lg transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Recipient</div>
                <div className="flex items-center space-x-2">
                  {payout.recipient.type === 'bank' && <Building2 className="h-4 w-4 text-gray-400" />}
                  {payout.recipient.type === 'card' && <CreditCard className="h-4 w-4 text-gray-400" />}
                  {payout.recipient.type === 'crypto' && <Bitcoin className="h-4 w-4 text-gray-400" />}
                  <span className="text-sm text-gray-900">{payout.recipient.name}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{payout.recipient.details}</div>
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

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <Download className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Download</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <Copy className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Copy ID</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Payouts: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4 text-yellow-600" /> },
    { value: 'processing', label: 'Processing', icon: <Clock className="h-4 w-4 text-blue-600" /> },
    { value: 'paid', label: 'Paid', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { value: 'failed', label: 'Failed', icon: <AlertCircle className="h-4 w-4 text-red-600" /> },
    { value: 'cancelled', label: 'Cancelled', icon: <XCircle className="h-4 w-4 text-gray-600" /> }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Payouts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your payouts and withdrawals
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
        >
          <ArrowDownLeft className="h-4 w-4 mr-2" />
          Create Payout
        </motion.button>
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
              <button className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                  <button className="flex items-center space-x-2">
                    <span>Date</span>
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  </button>
                </th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">ID</th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Recipient</th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                  <button className="flex items-center space-x-2">
                    <span>Amount</span>
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  </button>
                </th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Status</th>
                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Fee</th>
                <th className="text-right text-sm font-medium text-gray-500 px-6 py-4"></th>
              
              </tr>
            </thead>
            <tbody>
              {samplePayouts.map((payout) => (
                <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {format(payout.date, 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">
                    {payout.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {payout.recipient.type === 'bank' && (
                        <Building2 className="h-4 w-4 text-gray-400" />
                      )}
                      {payout.recipient.type === 'card' && (
                        <CreditCard className="h-4 w-4 text-gray-400" />
                      )}
                      {payout.recipient.type === 'crypto' && (
                        <Bitcoin className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-900">{payout.recipient.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{payout.recipient.details}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {payout.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: payout.currency,
                    })}
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
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {payout.fee.toLocaleString('en-US', {
                      style: 'currency',
                      currency: payout.currency,
                    })}
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
        {isCreateModalOpen && (
          <PayoutModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        )}
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