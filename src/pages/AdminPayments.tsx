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
  CreditCard,
  Building2,
  Bitcoin
} from 'lucide-react';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from '../components/DatePicker';
import CustomSelect from '../components/CustomSelect';

interface Payment {
  id: string;
  date: Date;
  merchantOrderId: string;
  systemTransactionId: string;
  merchantName: string;
  payerName: string;
  payerEmail: string;
  paymentMethod: {
    type: 'card' | 'bank' | 'crypto';
    details: string;
  };
  type: 'payment' | 'refund' | 'deposit';
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'error';
  ipAddress: string;
  country: string;
}

const samplePayments: Payment[] = [
  {
    id: 'PAY-001',
    date: new Date('2024-03-20'),
    merchantOrderId: 'ORD-123456',
    systemTransactionId: 'TRX-789012',
    merchantName: 'Acme Store',
    payerName: 'John Smith',
    payerEmail: 'john.smith@example.com',
    paymentMethod: {
      type: 'card',
      details: '****4242'
    },
    type: 'payment',
    amount: 1250.00,
    currency: 'USD',
    status: 'success',
    ipAddress: '192.168.1.1',
    country: 'United States'
  },
  {
    id: 'PAY-002',
    date: new Date('2024-03-19'),
    merchantOrderId: 'ORD-123457',
    systemTransactionId: 'TRX-789013',
    merchantName: 'Tech Shop',
    payerName: 'Alice Johnson',
    payerEmail: 'alice.johnson@example.com',
    paymentMethod: {
      type: 'bank',
      details: 'GB29NWBK60161331926819'
    },
    type: 'payment',
    amount: 750.50,
    currency: 'USD',
    status: 'pending',
    ipAddress: '192.168.1.2',
    country: 'Canada'
  },
  {
    id: 'PAY-003',
    date: new Date('2024-03-18'),
    merchantOrderId: 'ORD-123458',
    systemTransactionId: 'TRX-789014',
    merchantName: 'Digital Goods',
    payerName: 'Bob Wilson',
    payerEmail: 'bob.wilson@example.com',
    paymentMethod: {
      type: 'crypto',
      details: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    },
    type: 'payment',
    amount: 299.99,
    currency: 'USD',
    status: 'error',
    ipAddress: '192.168.1.3',
    country: 'United Kingdom'
  }
];

const PaymentDetailsModal: React.FC<{
  payment: Payment;
  onClose: () => void;
}> = ({ payment, onClose }) => {
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
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
                <p className="text-sm text-gray-500">{payment.systemTransactionId}</p>
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
                <div className="text-sm font-medium text-gray-500 mb-1">Payer Details</div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-900 font-medium">{payment.payerName}</div>
                  <div className="text-sm text-gray-600">{payment.payerEmail}</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Payment Method</div>
                <div className="flex items-center space-x-2">
                  {payment.paymentMethod.type === 'card' && (
                    <>
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Card ending in {payment.paymentMethod.details.slice(-4)}</span>
                    </>
                  )}
                  {payment.paymentMethod.type === 'bank' && (
                    <>
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900 font-mono">
                        {payment.paymentMethod.details}
                      </span>
                    </>
                  )}
                  {payment.paymentMethod.type === 'crypto' && (
                    <>
                      <Bitcoin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900 font-mono">
                        {`${payment.paymentMethod.details.slice(0, 6)}...${payment.paymentMethod.details.slice(-4)}`}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Merchant Order ID</div>
                <div className="text-sm text-gray-900">{payment.merchantOrderId}</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">System Transaction ID</div>
                <div className="text-sm text-gray-900">{payment.systemTransactionId}</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
                <div className="mt-1">
                  {payment.status === 'success' && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Success</span>
                    </div>
                  )}
                  {payment.status === 'pending' && (
                    <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">Pending</span>
                    </div>
                  )}
                  {payment.status === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg w-fit">
                      <AlertTriangle className="h-4 w-4" />
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
                  {payment.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: payment.currency,
                  })}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Merchant</div>
                <div className="text-sm text-gray-900">{payment.merchantName}</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Date</div>
                <div className="text-sm text-gray-900">
                  {format(payment.date, 'PPpp')}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">IP Address</div>
                <div className="text-sm text-gray-900">{payment.ipAddress}</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Country</div>
                <div className="text-sm text-gray-900">{payment.country}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdminPayments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4 text-yellow-600" /> },
    { value: 'error', label: 'Error', icon: <AlertTriangle className="h-4 w-4 text-red-600" /> }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Payments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage incoming payments
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search payments..."
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
                  <span className="text-sm font-medium text-gray-500">Merchant Order ID</span>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">System Transaction ID</span>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Merchant Name</span>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Gateway Name</span>
                </th>
                <th className="text-left px-6 py-4">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>Amount</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="w-[50px]"></th>
              </tr>
            </thead>
            <tbody>
              {samplePayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {format(payment.date, 'MMM d, yyyy')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-gray-900">{payment.merchantOrderId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-gray-900">{payment.systemTransactionId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{payment.merchantName}</span>
                  </td>
                  <td className="px-6 py-4">
                    {payment.status === 'success' && (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Success</span>
                      </div>
                    )}
                    {payment.status === 'pending' && (
                      <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Pending</span>
                      </div>
                    )}
                    {payment.status === 'error' && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg w-fit">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Error</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{payment.paymentMethod.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {payment.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: payment.currency,
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedPayment(payment)}
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
        {selectedPayment && (
          <PaymentDetailsModal
            payment={selectedPayment}
            onClose={() => setSelectedPayment(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPayments;