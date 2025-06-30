import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const { cart, updateCartQuantity, removeFromCart, createOrder, clearCart } = useOrder();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'money' as 'money' | 'card' | 'pix'
  });

  const total = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!customerData.name || !customerData.phone) {
      alert('Por favor, preencha nome e telefone');
      return;
    }
    
    createOrder(customerData);
    alert('Pedido enviado! Você receberá a confirmação via WhatsApp.');
    onClose();
  };

  if (cart.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Carrinho vazio</h3>
            <p className="text-gray-600 mb-6">Adicione alguns itens deliciosos ao seu carrinho!</p>
            <button onClick={onClose} className="btn-primary">
              Continuar comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Seu Carrinho</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-96">
          {!showCheckout ? (
            <div className="p-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.menuItem.name}</h4>
                    <p className="text-primary-600 font-bold">
                      R$ {item.menuItem.price.toFixed(2)}
                    </p>
                    {item.observations && (
                      <p className="text-sm text-gray-600">Obs: {item.observations}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Dados para entrega</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                    className="input-field"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                    className="input-field"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço para entrega
                  </label>
                  <textarea
                    value={customerData.address}
                    onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                    className="input-field"
                    rows={3}
                    placeholder="Rua, número, bairro... (deixe vazio para retirada no local)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Forma de pagamento
                  </label>
                  <select
                    value={customerData.paymentMethod}
                    onChange={(e) => setCustomerData({...customerData, paymentMethod: e.target.value as any})}
                    className="input-field"
                  >
                    <option value="money">Dinheiro</option>
                    <option value="card">Cartão</option>
                    <option value="pix">PIX</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-primary-600">
              R$ {total.toFixed(2)}
            </span>
          </div>
          
          {!showCheckout ? (
            <div className="flex gap-3">
              <button onClick={clearCart} className="btn-secondary flex-1">
                Limpar carrinho
              </button>
              <button 
                onClick={() => setShowCheckout(true)}
                className="btn-primary flex-1"
              >
                Finalizar pedido
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCheckout(false)}
                className="btn-secondary flex-1"
              >
                Voltar
              </button>
              <button onClick={handleCheckout} className="btn-primary flex-1">
                Confirmar pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}