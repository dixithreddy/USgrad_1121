import React from 'react';
import { Download, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    client: 'Stanford University',
    amount: 15000,
    currency: 'USD',
    status: 'paid',
    dueDate: '2024-04-15',
    items: [
      {
        description: 'Student Recruitment Commission',
        quantity: 1,
        rate: 15000,
        amount: 15000
      }
    ]
  },
  {
    id: '2',
    number: 'INV-2024-002',
    client: 'MIT',
    amount: 12500,
    currency: 'USD',
    status: 'pending',
    dueDate: '2024-04-30',
    items: [
      {
        description: 'Student Recruitment Commission',
        quantity: 1,
        rate: 12500,
        amount: 12500
      }
    ]
  }
];

const InvoiceList = () => {
  const getStatusColor = (status: string) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const handleDownload = (invoice: Invoice) => {
    // In a real application, this would generate and download a PDF invoice
    console.log('Download invoice:', invoice);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockInvoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{invoice.number}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{invoice.client}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {invoice.currency} {invoice.amount.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload(invoice)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    title="View"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;