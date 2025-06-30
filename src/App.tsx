import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientArea from './components/ClientArea';
import AdminArea from './components/AdminArea';
import Login from './components/Login';
import { OrderProvider } from './context/OrderContext';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <OrderProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<ClientArea />} />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <AdminArea />
                ) : (
                  <Login 
                    onLogin={(success) => {
                      setIsAuthenticated(success);
                      setIsAdmin(success);
                    }} 
                  />
                )
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;