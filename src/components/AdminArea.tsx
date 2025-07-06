import React, { useState } from 'react';
import { Package, ShoppingBag, Settings, BarChart3, Clock, CheckCircle, XCircle, ArrowLeft, LogOut } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MenuManagement from './MenuManagement';
import Footer from './Footer';

interface AdminAreaProps {
  onSwitchToClient: () => void;
  onLogout: () => void;
}

export default function AdminArea({ onSwitchToClient, onLogout }: AdminAreaProps) {
  const { orders, updateOrderStatus } = useOrder();
  const [activeTab, setActiveTab] = useState('orders');

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-orange-100 text-orange-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      preparing: 'Preparando',
      ready: 'Pronto',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const todayOrders = orders.filter(order => {
    const today = new Date();
    const orderDate = new Date(order.createdAt);
    return orderDate.toDateString() === today.toDateString();
  });

  const todayRevenue = todayOrders
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onSwitchToClient}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
                title="Voltar para área do cliente"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Voltar</span>
              </button>
              <h1 className="text-2xl font-bold text-primary-600">🍔 Admin - LancheExpress</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Faturamento hoje: <strong className="text-primary-600">R$ {todayRevenue.toFixed(2)}</strong>
              </span>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                title="Sair"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <ShoppingBag className="text-blue-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pedidos Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">{todayOrders.length}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="text-yellow-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Entregues</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'delivered').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="bg-primary-100 p-3 rounded-full">
                  <BarChart3 className="text-primary-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Faturamento</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {todayRevenue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'orders'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pedidos
                </button>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'menu'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Cardápio
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'orders' && (
            <div className="space-y-6 mb-16">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum pedido ainda</h3>
                  <p className="text-gray-600">Os pedidos aparecerão aqui quando os clientes fizerem compras.</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
                        <p className="text-gray-600">
                          {format(new Date(order.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Cliente</h4>
                        <p className="text-gray-600">{order.customerName}</p>
                        <p className="text-gray-600">{order.customerPhone}</p>
                        {order.deliveryAddress && (
                          <p className="text-gray-600 mt-1">{order.deliveryAddress}</p>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Itens</h4>
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.menuItem.name}</span>
                            <span>R$ {(item.menuItem.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>R$ {order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      {order.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            className="btn-primary"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="btn-primary"
                        >
                          Iniciar Preparo
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="btn-primary"
                        >
                          Marcar como Pronto
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="btn-primary"
                        >
                          Marcar como Entregue
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="mb-16">
              <MenuManagement />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}