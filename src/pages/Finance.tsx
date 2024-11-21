import React, { useState } from 'react';
import { 
  DollarSign, 
  FileText, 
  Download,
  Filter,
  Plus 
} from 'lucide-react';
import InvoiceList from '../components/finance/InvoiceList';
import PaymentsList from '../components/finance/PaymentsList';
import CommissionTracker from '../components/finance/CommissionTracker';
import FinancialStats from '../components/finance/FinancialStats';
import InvoiceModal from '../components/finance/InvoiceModal';

const Finance = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'commissions'>('invoices');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'commissions', label: 'Commissions', icon: Download }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
          <p className="mt-2 text-gray-600">Track invoices, payments, and commissions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            New Invoice
          </button>
        </div>
      </div>

      <FinancialStats />

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b px-4">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-4 flex items-center gap-2 border-b-2 font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'invoices' && <InvoiceList />}
          {activeTab === 'payments' && <PaymentsList />}
          {activeTab === 'commissions' && <CommissionTracker />}
        </div>
      </div>

      {showInvoiceModal && (
        <InvoiceModal
          onClose={() => setShowInvoiceModal(false)}
          onSubmit={(data) => {
            console.log('Create invoice:', data);
            setShowInvoiceModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Finance;