import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, MenuItem, OrderItem, FooterConfig } from '../types';

interface OrderContextType {
  orders: Order[];
  menuItems: MenuItem[];
  cart: OrderItem[];
  footerConfig: FooterConfig;
  addToCart: (item: MenuItem, quantity: number, observations?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: (customerData: any) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateMenuItem: (item: MenuItem) => void;
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  updateFooterConfig: (config: FooterConfig) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'X-Burger Clássico',
    description: 'Hambúrguer artesanal, queijo, alface, tomate e molho especial',
    price: 18.90,
    category: 'Hambúrgueres',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true
  },
  {
    id: '2',
    name: 'X-Bacon',
    description: 'Hambúrguer artesanal, bacon crocante, queijo e molho barbecue',
    price: 22.90,
    category: 'Hambúrgueres',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true
  },
  {
    id: '3',
    name: 'Batata Frita',
    description: 'Porção de batata frita crocante temperada',
    price: 12.90,
    category: 'Acompanhamentos',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true
  },
  {
    id: '4',
    name: 'Refrigerante Lata',
    description: 'Coca-Cola, Guaraná ou Fanta - 350ml',
    price: 5.90,
    category: 'Bebidas',
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true
  }
];

const initialFooterConfig: FooterConfig = {
  enabled: true,
  companyName: 'LancheExpress',
  description: 'Lanches artesanais feitos com ingredientes frescos e muito amor. Sabor que você nunca esquece!',
  address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
  phone: '(11) 99999-9999',
  email: 'contato@lancheexpress.com',
  hours: 'Segunda a Domingo: 18h às 23h',
  whatsapp: '(11) 99999-9999',
  instagram: '@lancheexpress',
  facebook: 'LancheExpress'
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(initialFooterConfig);

  const addToCart = (item: MenuItem, quantity: number, observations?: string) => {
    const existingItem = cart.find(cartItem => cartItem.menuItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.menuItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity, observations }
          : cartItem
      ));
    } else {
      const newItem: OrderItem = {
        id: Date.now().toString(),
        menuItem: item,
        quantity,
        observations
      };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (customerData: any) => {
    const total = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: customerData.name,
      customerPhone: customerData.phone,
      items: [...cart],
      total,
      status: 'pending',
      createdAt: new Date(),
      deliveryAddress: customerData.address,
      paymentMethod: customerData.paymentMethod
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    
    // Simular envio para WhatsApp
    sendWhatsAppNotification(newOrder);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(menuItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const addMenuItem = (newItem: MenuItem) => {
    setMenuItems([...menuItems, { ...newItem, id: Date.now().toString() }]);
  };

  const deleteMenuItem = (itemId: string) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  const updateFooterConfig = (config: FooterConfig) => {
    setFooterConfig(config);
  };

  const sendWhatsAppNotification = (order: Order) => {
    const message = `🍔 *NOVO PEDIDO* 🍔\n\n` +
      `*Cliente:* ${order.customerName}\n` +
      `*Telefone:* ${order.customerPhone}\n` +
      `*Endereço:* ${order.deliveryAddress || 'Retirada no local'}\n\n` +
      `*Itens:*\n` +
      order.items.map(item => 
        `• ${item.quantity}x ${item.menuItem.name} - R$ ${(item.menuItem.price * item.quantity).toFixed(2)}\n` +
        (item.observations ? `  Obs: ${item.observations}\n` : '')
      ).join('') +
      `\n*Total: R$ ${order.total.toFixed(2)}*\n` +
      `*Pagamento:* ${order.paymentMethod === 'money' ? 'Dinheiro' : order.paymentMethod === 'card' ? 'Cartão' : 'PIX'}\n\n` +
      `*Pedido #${order.id}*`;

    // Simular abertura do WhatsApp (em produção, usar API do WhatsApp Business)
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <OrderContext.Provider value={{
      orders,
      menuItems,
      cart,
      footerConfig,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      createOrder,
      updateOrderStatus,
      updateMenuItem,
      addMenuItem,
      deleteMenuItem,
      updateFooterConfig
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}