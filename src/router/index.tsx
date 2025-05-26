import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import Layout from '../components/Layout';

// Pages
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Users from '../pages/Users';
import Integration from '../pages/Integration';
import Account from '../pages/Account';
import Transactions from '../pages/Transactions';
import Payouts from '../pages/Payouts';
import Settings from '../pages/Settings';
import PaymentLinks from '../pages/PaymentLinks';
import AdminPayments from '../pages/AdminPayments';
import AdminPayouts from '../pages/AdminPayouts';
import AdminPaymentLinks from '../pages/AdminPaymentLinks';
import AdminSettings from '../pages/AdminSettings';
import AdminAuditLog from '../pages/AdminAuditLog';
import AdminSupport from '../pages/AdminSupport';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/account" replace />,
      },
      {
        path: 'dashboard',
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/account" replace />,
          },
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'integration',
            element: <Integration />,
          },
          {
            path: 'transactions',
            element: <Transactions />,
          },
          {
            path: 'payouts',
            element: <Payouts />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'payment-links',
            element: <PaymentLinks />,
          },
          {
            path: '*',
            element: <Navigate to="/dashboard/account" replace />,
          }
        ],
      },
      {
        path: 'admin',
        children: [
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <Admin />,
          },
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'payments',
            element: <AdminPayments />,
          },
          {
            path: 'payouts',
            element: <AdminPayouts />,
          },
          {
            path: 'payment-links',
            element: <AdminPaymentLinks />,
          },
          {
            path: 'settings',
            element: <AdminSettings />,
          },
          {
            path: 'logs',
            element: <AdminAuditLog />,
          },
          {
            path: 'support',
            element: <AdminSupport />,
          },
          {
            path: '*',
            element: <Navigate to="/admin/dashboard" replace />,
          }
        ],
      },
      {
        path: '*',
        element: <Navigate to="/dashboard/account" replace />,
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  }
]);

export default router;