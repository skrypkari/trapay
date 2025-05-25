// Common interfaces and types used throughout the application

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'client';
  email: string;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'bank';
  last4: string;
  expiryDate?: string;
}