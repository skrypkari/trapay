import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  ChevronDown,
  Download,
  FileText,
  Share2,
  Printer,
  MoreHorizontal,
  Wallet,
  CreditCard,
  Receipt,
  AlertCircle,
  Copy,
  Menu
} from 'lucide-react';
import { format } from 'date-fns';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from '../components/DatePicker';

interface Transaction {
  id: string;
  date: Date;
  counterparty: string;
  type: 'payment' | 'refund' | 'deposit';
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'error';
}

const sampleTransactions: Transaction[] = [
  {
    id: 'TRX-001',
    date: new Date('2024-03-20'),
    counterparty: 'John Smith',
    type: 'payment',
    amount: 1250.00,
    currency: 'USD',
    status: 'success'
  },
  {
    id: 'TRX-002',
    date: new Date('2024-03-19'),
    counterparty: 'Alice Johnson',
    type: 'deposit',
    amount: 3000.00,
    currency: 'USD',
    status: 'success'
  },
  {
    id: 'TRX-003',
    date: new Date('2024-03-18'),
    counterparty: 'Bob Wilson',
    type: 'refund',
    amount: 750.00,
    currency: 'USD',
    status: 'pending'
  },
  {
    id: 'TRX-004',
    date: new Date('2024-03-17'),
    counterparty: 'Sarah Davis',
    type: 'payment',
    amount: 2100.00,
    currency: 'USD',
    status: 'error'
  },
  {
    id: 'TRX-005',
    date: new Date('2024-03-16'),
    counterparty: 'Michael Brown',
    type: 'deposit',
    amount: 5000.00,
    currency: 'USD',
    status: 'success'
  },
  {
    id: 'TRX-006',
    date: new Date('2024-03-15'),
    counterparty: 'Emma Wilson',
    type: 'payment',
    amount: 890.00,
    currency: 'USD',
    status: 'success'
  },
  {
    id: 'TRX-007',
    date: new Date('2024-03-14'),
    counterparty: 'David Miller',
    type: 'refund',
    amount: 450.00,
    currency: 'USD',
    status: 'pending'
  },
  {
    id: 'TRX-008',
    date: new Date('2024-03-13'),
    counterparty: 'Sophie Taylor',
    type: 'deposit',
    amount: 7500.00,
    currency: 'USD',
    status: 'success'
  },
  {
    id: 'TRX-009',
    date: new Date('2024-03-12'),
    counterparty: 'James Anderson',
    type: 'payment',
    amount: 1750.00,
    currency: 'USD',
    status: 'success'
  },
  {
    id: 'TRX-010',
    date: new Date('2024-03-11'),
    counterparty: 'Oliver White',
    type: 'refund',
    amount: 299.99,
    currency: 'USD',
    status: 'error'
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
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-left flex items-center justify-between hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 group shadow-sm hover:shadow-md"
      >
        {value === 'all' ? (
          <span className="text-gray-500 truncate">{placeholder}</span>
        ) : (
          <span className="flex items-center space-x-2 truncate">
            {options.find(opt => opt.value === value)?.icon}
            <span>{options.find(opt => opt.value === value)?.label}</span>
          </span>
        )}
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-all duration-300 group-hover:text-primary flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl py-2 overflow-hidden"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.025)' }}
                className={`w-full px-4 py-2.5 text-left flex items-center space-x-2 ${
                  value === option.value ? 'bg-primary/5 text-primary' : 'text-gray-700'
                }`}
              >
                {option.icon}
                <span className="truncate">{option.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CustomDateInput: React.FC<{
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = 'Select date' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-left flex items-center space-x-3 hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 group shadow-sm hover:shadow-md"
      >
        <Calendar className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value ? format(value, 'MMM d, yyyy') : placeholder}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <DatePicker
            value={value}
            onChange={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TransactionDetailsModal: React.FC<{
  transaction: Transaction;
  onClose: () => void;
}> = ({ transaction, onClose }) => {
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
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl w-[calc(100vw-2rem)] md:w-full max-w-2xl mx-auto overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              {transaction.type === 'payment' && <ArrowUpRight className="h-5 w-5 text-primary" />}
              {transaction.type === 'refund' && <RefreshCw className="h-5 w-5 text-primary" />}
              {transaction.type === 'deposit' && <ArrowDownLeft className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Transaction Details
              </h3>
              <p className="text-sm text-gray-500">
                {format(transaction.date, 'PPpp')}
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

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Transaction ID</div>
                <div className="text-sm text-gray-900 font-mono flex items-center justify-between">
                  {transaction.id}
                  <button className="text-primary hover:text-primary-dark p-1 hover:bg-primary/5 rounded-lg transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Counterparty</div>
                <div className="text-sm text-gray-900">{transaction.counterparty}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
                <div className="mt-1 flex items-center space-x-2">
                  {transaction.status === 'success' && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Success</span>
                    </div>
                  )}
                  {transaction.status === 'pending' && (
                    <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Pending</span>
                    </div>
                  )}
                  {transaction.status === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Error</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Amount</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {transaction.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: transaction.currency,
                  })}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Payment Method</div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">**** **** **** 4242</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Type</div>
                <div className="flex items-center space-x-2">
                  {transaction.type === 'payment' && (
                    <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Payment</span>
                    </div>
                  )}
                  {transaction.type === 'refund' && (
                    <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                      <RefreshCw className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Refund</span>
                    </div>
                  )}
                  {transaction.type === 'deposit' && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                      <ArrowDownLeft className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Deposit</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 md:pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
                <Receipt className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Receipt</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <Share2 className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Share</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <Printer className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Print</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4 text-yellow-600" /> },
    { value: 'error', label: 'Error', icon: <AlertCircle className="h-4 w-4 text-red-600" /> },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'payment', label: 'Payment', icon: <ArrowUpRight className="h-4 w-4 text-blue-600" /> },
    { value: 'refund', label: 'Refund', icon: <RefreshCw className="h-4 w-4 text-orange-600" /> },
    { value: 'deposit', label: 'Deposit', icon: <ArrowDownLeft className="h-4 w-4 text-green-600" /> },
  ];

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Transaction>();
    
    return [
      columnHelper.accessor('date', {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center space-x-2 group"
          >
            <span className="hidden sm:inline">Date</span>
            <span className="sm:hidden">Date</span>
            <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
          </button>
        ),
        cell: (info) => (
          <div className="whitespace-nowrap">
            <span className="hidden sm:inline">{format(info.getValue(), 'MMM d, yyyy')}</span>
            <span className="sm:hidden">{format(info.getValue(), 'MM/dd')}</span>
          </div>
        ),
      }),
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => (
          <span className="font-mono text-gray-600 hidden md:table-cell">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('counterparty', {
        header: 'Counterparty',
        cell: (info) => (
          <span className="truncate max-w-[150px] block">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: (info) => {
          const type = info.getValue();
          return (
            <div className="flex items-center space-x-2">
              {type === 'payment' && (
                <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 hidden sm:inline" />
                  <span className="text-sm font-medium capitalize truncate">{type}</span>
                </div>
              )}
              {type === 'refund' && (
                <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                  <RefreshCw className="h-4 w-4 hidden sm:inline" />
                  <span className="text-sm font-medium capitalize truncate">{type}</span>
                </div>
              )}
              {type === 'deposit' && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                  <ArrowDownLeft className="h-4 w-4 hidden sm:inline" />
                  <span className="text-sm font-medium capitalize truncate">{type}</span>
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('amount', {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center space-x-2 group"
          >
            <span>Amount</span>
            <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
          </button>
        ),
        cell: (info) => {
          const amount = info.getValue();
          const transaction = info.row.original;
          return (
            <div className={`font-medium whitespace-nowrap ${transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}`}>
              {amount.toLocaleString('en-US', {
                style: 'currency',
                currency: transaction.currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          );
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          return (
            <div className="flex items-center space-x-2">
              {status === 'success' && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 hidden sm:inline" />
                  <span className="text-sm font-medium capitalize truncate">Success</span>
                </div>
              )}
              {status === 'pending' && (
                <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg">
                  <Clock className="h-4 w-4 hidden sm:inline" />
                  <span className="text-sm font-medium capitalize truncate">Pending</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                  <AlertCircle className="h-4 w-4 hidden sm:inline" />
                  <span className="text-sm font-medium capitalize truncate">Error</span>
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: (info) => (
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => setSelectedTransaction(info.row.original)}
              className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200 hidden sm:block">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        ),
      }),
    ];
  }, []);

  const filteredData = useMemo(() => {
    return sampleTransactions.filter(transaction => {
      const matchesSearch = 
        transaction.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      
      const matchesDateRange = (!startDate || transaction.date >= startDate) &&
                              (!endDate || transaction.date <= endDate);

      return matchesSearch && matchesStatus && matchesType && matchesDateRange;
    });
  }, [searchTerm, statusFilter, typeFilter, startDate, endDate]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Transactions</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your transaction history
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 w-full sm:w-auto justify-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </motion.button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-3 md:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="p-2 md:p-3 bg-primary/10 rounded-xl flex-shrink-0">
              <Wallet className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-500">Total Volume</p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">$45,231</p>
              <p className="text-xs md:text-sm text-green-600">+2.5% from last month</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-3 md:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="p-2 md:p-3 bg-blue-50 rounded-xl flex-shrink-0">
              <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-500">Total Payments</p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">1,234</p>
              <p className="text-xs md:text-sm text-green-600">+5.2% from last month</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-3 md:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="p-2 md:p-3 bg-orange-50 rounded-xl flex-shrink-0">
              <RefreshCw className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-500">Total Refunds</p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">45</p>
              <p className="text-xs md:text-sm text-red-600">-1.8% from last month</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-3 md:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="p-2 md:p-3 bg-green-50 rounded-xl flex-shrink-0">
              <ArrowDownLeft className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-500">Total Deposits</p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">789</p>
              <p className="text-xs md:text-sm text-green-600">+3.1% from last month</p>
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
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4">
              <CustomSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                placeholder="Filter by status"
                className="w-full sm:w-[180px]"
              />
              <CustomSelect
                value={typeFilter}
                onChange={setTypeFilter}
                options={typeOptions}
                placeholder="Filter by type"
                className="w-full sm:w-[180px]"
              />
              <div className="flex gap-4 col-span-2 sm:col-span-1">
                <div className="flex-1">
                  <CustomDateInput
                    value={startDate}
                    onChange={setStartDate}
                    placeholder="Start date"
                  />
                </div>
                <div className="flex-1">
                  <CustomDateInput
                    value={endDate}
                    onChange={setEndDate}
                    placeholder="End date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-3 md:mx-0">
          <table className="w-full min-w-[800px] md:w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {table.getFlatHeaders().map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 first:pl-6 last:pr-6"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-600 first:pl-6 last:pr-6"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedTransaction && (
          <TransactionDetailsModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Transactions;