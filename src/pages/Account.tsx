import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  ArrowDown, 
  Link as LinkIcon, 
  Send, 
  CreditCard,
  Bell,
  ShieldCheck
} from 'lucide-react';
import Chart from 'react-apexcharts';
import Banner, { BannerData } from '../components/Banner';

const Account: React.FC = () => {
  const initialBanners: BannerData[] = [
    {
      id: '1',
      type: 'info',
      title: 'System Updates',
      description: 'Send money instantly using usernames - New feature available now!',
      action: {
        label: 'Learn more',
        onClick: () => console.log('Learn more clicked'),
      },
    },
    {
      id: '2',
      type: 'warning',
      title: 'Security Tips',
      description: 'Protect your account with two-factor authentication (2FA).',
      action: {
        label: 'Enable 2FA',
        onClick: () => console.log('Enable 2FA clicked'),
      },
    },
    {
      id: '3',
      type: 'success',
      title: 'Referral Program',
      description: 'Invite friends and get 10% of their transaction fees for 3 months!',
      action: {
        label: 'Copy invite link',
        onClick: () => console.log('Copy invite link clicked'),
      },
    },
  ];

  const [banners, setBanners] = useState<BannerData[]>(initialBanners);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handleRemoveBanner = (id: string) => {
    setBanners(prev => {
      const newBanners = prev.filter(banner => banner.id !== id);
      if (currentBannerIndex >= newBanners.length) {
        setCurrentBannerIndex(Math.max(0, newBanners.length - 1));
      }
      return newBanners;
    });
  };

  const handlePreviousBanner = useCallback(() => {
    setCurrentBannerIndex(prev => (prev > 0 ? prev - 1 : banners.length - 1));
  }, [banners.length]);

  const handleNextBanner = useCallback(() => {
    setCurrentBannerIndex(prev => (prev < banners.length - 1 ? prev + 1 : 0));
  }, [banners.length]);

  // Chart configuration
  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#6936d3', '#94a3b8'],
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100]
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `$${value}`,
        style: {
          fontSize: '12px'
        }
      }
    },
    grid: {
      strokeDashArray: 4,
      padding: {
        left: 20
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 200
        },
        xaxis: {
          labels: {
            rotate: -45,
            style: {
              fontSize: '10px'
            }
          }
        }
      }
    }]
  };

  const series = [
    {
      name: 'Income',
      data: [3100, 4000, 2800, 5100, 4200, 6000, 4800]
    },
    {
      name: 'Expenses',
      data: [2200, 3000, 1800, 4000, 3200, 4800, 3800]
    }
  ];

  const recentTransactions = [
    { id: 1, date: '2024-03-20', amount: 250.00, type: 'payment', status: 'completed' },
    { id: 2, date: '2024-03-19', amount: 1000.00, type: 'deposit', status: 'completed' },
    { id: 3, date: '2024-03-18', amount: 75.50, type: 'refund', status: 'pending' },
    { id: 4, date: '2024-03-17', amount: 500.00, type: 'withdrawal', status: 'completed' },
    { id: 5, date: '2024-03-16', amount: 125.00, type: 'payment', status: 'failed' },
  ];

  const notifications = [
    { id: 1, title: 'New security update available', type: 'security' },
    { id: 2, title: 'Payment of $250.00 received', type: 'payment' },
    { id: 3, title: 'Support ticket #123 updated', type: 'support' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Banner Slider */}
      <Banner
        banners={banners}
        onRemove={handleRemoveBanner}
        currentIndex={currentBannerIndex}
        onPrevious={handlePreviousBanner}
        onNext={handleNextBanner}
      />

      {/* Balance Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Account Balance</h2>
            <p className="text-3xl md:text-4xl font-bold text-primary mt-2">$12,345.67</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark">
              <Plus className="h-4 w-4 mr-2" />
              Deposit
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
              <ArrowDown className="h-4 w-4 mr-2" />
              Withdraw
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-48 md:h-64">
          <Chart
            options={chartOptions}
            series={series}
            type="area"
            height="100%"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <Link to="/dashboard/transactions" className="text-primary hover:text-primary-dark text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-3 px-4 md:px-3 font-medium">Date</th>
                    <th className="pb-3 px-4 md:px-3 font-medium">Amount</th>
                    <th className="pb-3 px-4 md:px-3 font-medium">Type</th>
                    <th className="pb-3 px-4 md:px-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="py-3 px-4 md:px-3 text-sm">{transaction.date}</td>
                      <td className="py-3 px-4 md:px-3 text-sm">${transaction.amount.toFixed(2)}</td>
                      <td className="py-3 px-4 md:px-3 text-sm capitalize">{transaction.type}</td>
                      <td className="py-3 px-4 md:px-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              <button className="w-full inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
                <span className="truncate">Create Payment Link</span>
              </button>
              <button className="w-full inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                <Send className="h-4 w-4 mr-2 text-gray-500" />
                <span className="truncate">Send Payment</span>
              </button>
              <button className="w-full inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                <span className="truncate">Add Payment Method</span>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  {notification.type === 'security' && (
                    <ShieldCheck className="h-5 w-5 text-blue-500 mt-0.5" />
                  )}
                  {notification.type === 'payment' && (
                    <CreditCard className="h-5 w-5 text-green-500 mt-0.5" />
                  )}
                  {notification.type === 'support' && (
                    <Bell className="h-5 w-5 text-yellow-500 mt-0.5" />
                  )}
                  <p className="text-sm text-gray-600">{notification.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;