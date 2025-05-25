import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Copy,
  Eye,
  Link2,
  Calendar,
  Globe,
  Lock,
  Mail,
  RefreshCw,
  ArrowUpDown,
  MoreHorizontal,
  X,
  Check,
  ExternalLink,
  AlertTriangle,
  Wallet,
  ChevronDown,
  ChevronRight,
  Share2,
  Trash2,
  Edit3,
  BarChart2,
  Users,
  Clock,
  DollarSign,
  Zap,
  ShoppingBag,
  Gift,
  CreditCard,
  Menu
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from '../components/DatePicker';
import CustomSelect from '../components/CustomSelect';

interface PaymentLink {
  id: string;
  name: string;
  description: string;
  amount: number | null;
  currency: string;
  visibility: 'public' | 'private';
  expiryDate: Date | null;
  redirectUrl: string | null;
  emailNotification: boolean;
  allowReuse: boolean;
  showDescription: boolean;
  createdAt: Date;
  status: 'active' | 'expired' | 'disabled';
  type: 'single' | 'multi' | 'subscription' | 'donation';
  usageCount: number;
}

const sampleLinks: PaymentLink[] = [
  {
    id: 'pl_1',
    name: 'Consultation Fee',
    description: 'One hour consultation session',
    amount: 150,
    currency: 'USD',
    visibility: 'public',
    expiryDate: null,
    redirectUrl: 'https://example.com/thank-you',
    emailNotification: true,
    allowReuse: true,
    showDescription: true,
    createdAt: new Date('2024-03-15'),
    status: 'active',
    type: 'single',
    usageCount: 5
  },
  {
    id: 'pl_2',
    name: 'Monthly Subscription',
    description: 'Access to premium content',
    amount: 29.99,
    currency: 'USD',
    visibility: 'public',
    expiryDate: null,
    redirectUrl: null,
    emailNotification: true,
    allowReuse: true,
    showDescription: true,
    createdAt: new Date('2024-03-10'),
    status: 'active',
    type: 'subscription',
    usageCount: 12
  },
  {
    id: 'pl_3',
    name: 'Donation',
    description: 'Support our cause',
    amount: null,
    currency: 'USD',
    visibility: 'public',
    expiryDate: null,
    redirectUrl: null,
    emailNotification: true,
    allowReuse: true,
    showDescription: true,
    createdAt: new Date('2024-03-05'),
    status: 'active',
    type: 'donation',
    usageCount: 8
  }
];

const CreateLinkModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState('USD');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [emailNotification, setEmailNotification] = useState(true);
  const [allowReuse, setAllowReuse] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [linkType, setLinkType] = useState<'single' | 'multi' | 'subscription' | 'donation'>('single');

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' }
  ];

  const linkTypeOptions = [
    { value: 'single', label: 'Single-use', icon: <Link2 className="h-4 w-4" /> },
    { value: 'multi', label: 'Multi-use', icon: <RefreshCw className="h-4 w-4" /> },
    { value: 'subscription', label: 'Subscription', icon: <Calendar className="h-4 w-4" /> },
    { value: 'donation', label: 'Donation', icon: <Mail className="h-4 w-4" /> }
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl my-8"
          >
            <div className="px-6 py-4 border-b rounded-t-xl border-gray-200 bg-white z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create Payment Link</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Type
                  </label>
                  <CustomSelect
                    value={linkType}
                    onChange={(value) => setLinkType(value as typeof linkType)}
                    options={linkTypeOptions}
                    placeholder="Select link type"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="e.g., Consultation Fee"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Describe what this payment is for"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-4 pr-20 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="0.00"
                        step="0.01"
                        disabled={linkType === 'donation'}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <CustomSelect
                          value={currency}
                          onChange={setCurrency}
                          options={currencyOptions}
                          placeholder="Currency"
                          className="w-20"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visibility
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={visibility === 'public'}
                          onChange={() => setVisibility('public')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <span className="text-sm text-gray-600">Public</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={visibility === 'private'}
                          onChange={() => setVisibility('private')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <span className="text-sm text-gray-600">Private</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date (Optional)
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDatePickerOpen(true)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-left flex items-center space-x-3 hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className={expiryDate ? 'text-gray-900' : 'text-gray-500'}>
                        {expiryDate ? expiryDate.toLocaleDateString() : 'Select date'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isDatePickerOpen && (
                        <DatePicker
                          value={expiryDate}
                          onChange={(date) => {
                            setExpiryDate(date);
                            setIsDatePickerOpen(false);
                          }}
                          onClose={() => setIsDatePickerOpen(false)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Redirect URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="https://example.com/thank-you"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={emailNotification}
                      onChange={(e) => setEmailNotification(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Enable email notifications</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={allowReuse}
                      onChange={(e) => setAllowReuse(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      disabled={linkType === 'single'}
                    />
                    <span className="text-sm text-gray-600">Allow multiple payments</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showDescription}
                      onChange={(e) => setShowDescription(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Show description on payment page</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 sticky bottom-0 bg-white py-4 border-t border-gray-200 mt-6">
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
                  Create Link
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PaymentLinks: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCopied, setShowCopied] = useState<string | null>(null);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active', icon: <Check className="h-4 w-4 text-green-600" /> },
    { value: 'expired', label: 'Expired', icon: <AlertTriangle className="h-4 w-4 text-yellow-600" /> },
    { value: 'disabled', label: 'Disabled', icon: <X className="h-4 w-4 text-red-600" /> }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'single', label: 'Single-use', icon: <Link2 className="h-4 w-4" /> },
    { value: 'multi', label: 'Multi-use', icon: <RefreshCw className="h-4 w-4" /> },
    { value: 'subscription', label: 'Subscription', icon: <Calendar className="h-4 w-4" /> },
    { value: 'donation', label: 'Donation', icon: <Mail className="h-4 w-4" /> }
  ];

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: '$12,345',
      change: '+12.5%',
      isPositive: true
    },
    {
      icon: Users,
      label: 'Total Customers',
      value: '1,234',
      change: '+8.3%',
      isPositive: true
    },
    {
      icon: Zap,
      label: 'Conversion Rate',
      value: '3.2%',
      change: '-1.2%',
      isPositive: false
    },
    {
      icon: Clock,
      label: 'Avg. Time to Pay',
      value: '2m 34s',
      change: '-15.4%',
      isPositive: true
    }
  ];

  const quickActions = [
    {
      icon: Gift,
      label: 'Create Promo',
      description: 'Set up special offers',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      icon: ShoppingBag,
      label: 'Product Link',
      description: 'Link to specific items',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: CreditCard,
      label: 'Subscription',
      description: 'Recurring payments',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Users,
      label: 'Team Access',
      description: 'Manage permissions',
      color: 'bg-green-50 text-green-600'
    }
  ];

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`https://pay.example.com/${id}`);
    setShowCopied(id);
    setTimeout(() => setShowCopied(null), 2000);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Payment Links</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage payment links for your customers
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Link
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 hover:border-primary/20 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-gray-50">
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <span className={`text-xs sm:text-sm font-medium ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-3 sm:mt-4">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6 text-left border border-gray-100 hover:border-primary/20 transition-all duration-200"
          >
            <div className={`p-2 sm:p-3 rounded-xl ${action.color} inline-block`}>
              <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm sm:text-base text-gray-900 font-medium mt-3 sm:mt-4">{action.label}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{action.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-100">
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-7 border-b border-gray-100 px-6 py-4">
              <div className="text-sm font-medium text-gray-500">Name</div>
              <div className="text-sm font-medium text-gray-500">Type</div>
              <div className="text-sm font-medium text-gray-500">
                <button className="flex items-center space-x-2">
                  <span>Amount</span>
                  <ArrowUpDown className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <div className="text-sm font-medium text-gray-500">Status</div>
              <div className="text-sm font-medium text-gray-500">Usage</div>
              <div className="text-sm font-medium text-gray-500">
                <button className="flex items-center space-x-2">
                  <span>Created</span>
                  <ArrowUpDown className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <div className="text-right text-sm font-medium text-gray-500"></div>
            </div>

            {/* Table Body */}
            {sampleLinks.map((link) => (
              <div
                key={link.id}
                className="grid grid-cols-7 border-b border-gray-100 hover:bg-gray-50/50 px-6 py-4"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">{link.name}</div>
                  <div className="text-sm text-gray-500 truncate max-w-[200px]">{link.description}</div>
                </div>
                <div className="flex items-center">
                  {link.type === 'single' && (
                    <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-lg">
                      <Link2 className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium capitalize hidden sm:inline">Single</span>
                    </div>
                  )}
                  {link.type === 'multi' && (
                    <div className="flex items-center space-x-2 text-purple-600 bg-purple-50 px-2 sm:px-3 py-1 rounded-lg">
                      <RefreshCw className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium capitalize hidden sm:inline">Multi</span>
                    </div>
                  )}
                  {link.type === 'subscription' && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-lg">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium capitalize hidden sm:inline">Sub</span>
                    </div>
                  )}
                  {link.type === 'donation' && (
                    <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 px-2 sm:px-3 py-1 rounded-lg">
                      <Mail className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium capitalize hidden sm:inline">Donation</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    {link.amount === null ? 'Variable' : `$${link.amount}`}
                  </span>
                </div>
                <div>
                  {link.status === 'active' && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-lg w-fit">
                      <Check className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium capitalize hidden sm:inline">Active</span>
                    </div>
                  )}
                  {link.status === 'expired' && (
                    <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-2 sm:px-3 py-1 rounded-lg w-fit">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium capitalize hidden sm:inline">Expired</span>
                    </div>
                  )}
                  {link.status === 'disabled' && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-2 sm:px-3 py-1 rounded-lg w-fit">
                      <X className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium capitalize hidden sm:inline">Disabled</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-xs sm:text-sm text-gray-600">{link.usageCount} times</span>
                </div>
                <div>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {link.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                  <button
                    onClick={() => handleCopyLink(link.id)}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200 relative group"
                  >
                    {showCopied === link.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      Copy link
                    </span>
                  </button>
                  <button className="p-1.5 sm:p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 sm:p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateLinkModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentLinks;