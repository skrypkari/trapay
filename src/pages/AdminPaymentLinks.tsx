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
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  Link2,
  RefreshCw,
  ChevronDown,
  Share2,
  Trash2,
  Edit3,
  BarChart2,
  Users,
  Globe,
  Copy,
  Check
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from '../components/DatePicker';
import CustomSelect from '../components/CustomSelect';

interface PaymentLink {
  id: string;
  title: string;
  description: string;
  amount: number | null;
  currency: string;
  createdAt: Date;
  status: 'active' | 'paused' | 'expired';
  clicks: number;
  payments: number;
  conversionRate: number;
  totalRevenue: number;
  url: string;
}

const sampleLinks: PaymentLink[] = [
  {
    id: 'pl_1',
    title: 'Premium Subscription',
    description: 'Monthly subscription for premium features',
    amount: 29.99,
    currency: 'USD',
    createdAt: new Date('2024-03-15'),
    status: 'active',
    clicks: 1250,
    payments: 450,
    conversionRate: 36,
    totalRevenue: 13495.50,
    url: 'https://pay.example.com/premium-subscription'
  },
  {
    id: 'pl_2',
    title: 'One-time Donation',
    description: 'Support our cause with a donation',
    amount: null,
    currency: 'USD',
    createdAt: new Date('2024-03-10'),
    status: 'active',
    clicks: 3200,
    payments: 890,
    conversionRate: 27.8,
    totalRevenue: 25678.90,
    url: 'https://pay.example.com/donate'
  },
  {
    id: 'pl_3',
    title: 'Event Registration',
    description: 'Annual conference ticket',
    amount: 199.99,
    currency: 'USD',
    createdAt: new Date('2024-03-05'),
    status: 'paused',
    clicks: 800,
    payments: 120,
    conversionRate: 15,
    totalRevenue: 23998.80,
    url: 'https://pay.example.com/conference-2024'
  }
];

const LinkPreviewModal: React.FC<{
  link: PaymentLink;
  onClose: () => void;
}> = ({ link, onClose }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
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
                <Link2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{link.title}</h3>
                <p className="text-sm text-gray-500">{link.description}</p>
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
                <div className="text-sm font-medium text-gray-500 mb-1">Payment Link URL</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-900 font-mono truncate mr-2">{link.url}</div>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {showCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Amount</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {link.amount === null ? 'Variable' : `$${link.amount.toFixed(2)}`}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
                {link.status === 'active' && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium capitalize">Active</span>
                  </div>
                )}
                {link.status === 'paused' && (
                  <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium capitalize">Paused</span>
                  </div>
                )}
                {link.status === 'expired' && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg w-fit">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium capitalize">Expired</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Performance</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Clicks</span>
                    <span className="text-sm font-medium text-gray-900">{link.clicks}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Payments</span>
                    <span className="text-sm font-medium text-gray-900">{link.payments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="text-sm font-medium text-gray-900">{link.conversionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Revenue</span>
                    <span className="text-sm font-medium text-gray-900">${link.totalRevenue.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-500 mb-1">Created At</div>
                <div className="text-sm text-gray-900">
                  {link.createdAt.toLocaleDateString()}
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
                <Copy className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Copy Link</span>
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
                <Edit3 className="h-5 w-5 text-gray-400 group-hover:text-primary mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <Trash2 className="h-5 w-5 text-gray-400 group-hover:text-red-600 mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Delete</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdminPaymentLinks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLink, setSelectedLink] = useState<PaymentLink | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { value: 'paused', label: 'Paused', icon: <Clock className="h-4 w-4 text-yellow-600" /> },
    { value: 'expired', label: 'Expired', icon: <AlertTriangle className="h-4 w-4 text-red-600" /> }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Payment Links</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor user-generated payment links
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
            <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8.2%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">12,345</h3>
            <p className="text-sm text-gray-500 mt-1">Total Clicks</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+5.3%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">32.5%</h3>
            <p className="text-sm text-gray-500 mt-1">Conversion Rate</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+3.7%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900">4,567</h3>
            <p className="text-sm text-gray-500 mt-1">Unique Visitors</p>
          </div>
        </div>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search payment links..."
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
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>Title</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left px-6 py-4">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>Created</span>
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
                  <span className="text-sm font-medium text-gray-500">Performance</span>
                </th>
                <th className="text-left px-6 py-4">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                </th>
                <th className="text-right px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {sampleLinks.map((link) => (
                <tr key={link.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{link.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">{link.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {link.createdAt.toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {link.amount === null ? 'Variable' : `$${link.amount.toFixed(2)}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Clicks</span>
                        <span className="text-xs font-medium text-gray-900">{link.clicks}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Payments</span>
                        <span className="text-xs font-medium text-gray-900">{link.payments}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Conversion</span>
                        <span className="text-xs font-medium text-gray-900">{link.conversionRate}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {link.status === 'active' && (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Active</span>
                      </div>
                    )}
                    {link.status === 'paused' && (
                      <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Paused</span>
                      </div>
                    )}
                    {link.status === 'expired' && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg w-fit">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium capitalize">Expired</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedLink(link)}
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
        {selectedLink && (
          <LinkPreviewModal
            link={selectedLink}
            onClose={() => setSelectedLink(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPaymentLinks;