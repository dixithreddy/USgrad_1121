import React from 'react';
import { FileText, Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface Payment {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    client: 'Stanford University',
    amount: 15000,
    currency: 'USD',
    status: 'completed',
    date: '2024-03-15',
    method: 'Bank Transfer'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    client: 'MIT',
    amount: 12500,
    currency: 'USD',
    status: 'pending',
    date: '2024-03-20',
    method: 'Credit Card'
  }
];

const PaymentsList = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-yellow-600 border-t-transparent animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockPayments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-500">
                {format(new Date(payment.date), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {payment.invoiceNumber}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{payment.client}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {payment.currency} {payment.amount.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{payment.method}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {getStatusIcon(payment.status)}
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsList;