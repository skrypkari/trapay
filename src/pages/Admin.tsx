import React from 'react';
import { 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import Chart from 'react-apexcharts';

const Admin: React.FC = () => {
  // Overview statistics
  const stats = [
    {
      title: 'Total Revenue',
      value: '$128,450',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign
    },
    {
      title: 'Total Transactions',
      value: '3,124',
      change: '+8.2%',
      isPositive: true,
      icon: ArrowUpRight
    },
    {
      title: 'Active Users',
      value: '1,893',
      change: '+15.3%',
      isPositive: true,
      icon: Users
    },
    {
      title: 'Failed Transactions',
      value: '23',
      change: '-2.5%',
      isPositive: true,
      icon: AlertTriangle
    }
  ];

  // Recent transactions
  const recentTransactions = [
    {
      id: 'TRX-001',
      user: 'John Smith',
      amount: 1250.00,
      type: 'payment',
      status: 'completed',
      date: '2024-03-20 14:30'
    },
    {
      id: 'TRX-002',
      user: 'Alice Johnson',
      amount: 890.50,
      type: 'payout',
      status: 'pending',
      date: '2024-03-20 14:15'
    },
    {
      id: 'TRX-003',
      user: 'Bob Wilson',
      amount: 2500.00,
      type: 'payment',
      status: 'failed',
      date: '2024-03-20 14:00'
    }
  ];

  // Alerts/Suspicious activity
  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Multiple failed login attempts detected',
      time: '15 minutes ago'
    },
    {
      id: 2,
      type: 'error',
      message: 'Unusual transaction pattern detected',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'info',
      message: 'New user registration spike',
      time: '2 hours ago'
    }
  ];

  // Chart configuration for growth trends
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `$${value}K`,
        style: {
          colors: '#64748b',
          fontSize: '12px'
        }
      }
    },
    grid: {
      strokeDashArray: 4,
      borderColor: '#e2e8f0',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
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
          height: '200px'
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
      name: 'Revenue',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'Users',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your system's performance and key metrics
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto">
            Download Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark w-full sm:w-auto">
            View All Analytics
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className={`text-xs sm:text-sm font-medium ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-3 sm:mt-4">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Growth Trends</h2>
                <p className="text-sm text-gray-500">Revenue and user growth over time</p>
              </div>
              <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-[250px] sm:h-[300px]">
              <Chart
                options={chartOptions}
                series={series}
                type="area"
                height="100%"
              />
            </div>
          </div>
        </div>

        {/* Alerts/Suspicious Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">System Alerts</h2>
            <div className="space-y-3 sm:space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  {alert.type === 'warning' && (
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  )}
                  {alert.type === 'error' && (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  {alert.type === 'info' && (
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded-lg flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-500">Latest transactions and payouts</p>
            </div>
            <button className="text-sm text-primary hover:text-primary-dark font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="px-4 sm:px-6 pb-3 text-xs sm:text-sm font-medium text-gray-500">Transaction</th>
                    <th className="px-4 sm:px-6 pb-3 text-xs sm:text-sm font-medium text-gray-500">Amount</th>
                    <th className="px-4 sm:px-6 pb-3 text-xs sm:text-sm font-medium text-gray-500">Type</th>
                    <th className="px-4 sm:px-6 pb-3 text-xs sm:text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 sm:px-6 pb-3 text-xs sm:text-sm font-medium text-gray-500">Date</th>
                    <th className="px-4 sm:px-6 pb-3 text-xs sm:text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100">
                      <td className="px-4 sm:px-6 py-4">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">{transaction.user}</p>
                          <p className="text-xs text-gray-500">{transaction.id}</p>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-900">
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'payment'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-purple-50 text-purple-700'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        {transaction.status === 'completed' && (
                          <span className="inline-flex items-center text-green-600">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            <span className="text-xs sm:text-sm">Completed</span>
                          </span>
                        )}
                        {transaction.status === 'pending' && (
                          <span className="inline-flex items-center text-yellow-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-xs sm:text-sm">Pending</span>
                          </span>
                        )}
                        {transaction.status === 'failed' && (
                          <span className="inline-flex items-center text-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            <span className="text-xs sm:text-sm">Failed</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-xs sm:text-sm text-gray-500">{transaction.date}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Eye className="h-4 w-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;