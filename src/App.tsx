import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import Sidebar from './components/Sidebar';

// Import components normally to avoid dynamic import issues
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Universities from './pages/Universities';
import Agents from './pages/Agents';
import Analytics from './pages/Analytics';  // Add this import
import Finance from './pages/Finance';  // Add this import
import Settings from './pages/Settings';  // Add this import
import Communications from './pages/Communications';  // Add this import
import Documents from './pages/Documents';  // Add this import

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <main className="flex-1 ml-64 p-8">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/universities" element={<Universities />} />
                    <Route path="/agents" element={<Agents />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/analytics" element={<Analytics />} /> 
                    <Route path="/settings" element={<Settings />} /> 
                    <Route path="/finance" element={<Finance />} /> 
                    <Route path="/communications" element={<Communications />} /> 
                    <Route path="/documents" element={<Documents />} /> 
                    
                  </Routes>
                </main>
              </div>
            } />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;