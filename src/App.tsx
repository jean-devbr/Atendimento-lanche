import React, { useState } from 'react';
import ClientArea from './components/ClientArea';
import AdminArea from './components/AdminArea';
import Login from './components/Login';
import { OrderProvider } from './context/OrderContext';

function App() {
  const [currentView, setCurrentView] = useState<'client' | 'admin' | 'login'>('client');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleViewChange = (view: 'client' | 'admin') => {
    if (view === 'admin' && !isAuthenticated) {
      setCurrentView('login');
    } else {
      setCurrentView(view);
    }
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      setCurrentView('admin');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('client');
  };

  return (
    <OrderProvider>
      <div className="min-h-screen bg-gray-50">
        {currentView === 'client' && (
          <ClientArea onSwitchToAdmin={() => handleViewChange('admin')} />
        )}
        {currentView === 'admin' && (
          <AdminArea onSwitchToClient={() => setCurrentView('client')} onLogout={handleLogout} />
        )}
        {currentView === 'login' && (
          <Login onLogin={handleLogin} onCancel={() => setCurrentView('client')} />
        )}
      </div>
    </OrderProvider>
  );
}

export default App;