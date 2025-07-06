export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  observations?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryAddress?: string;
  paymentMethod: 'money' | 'card' | 'pix';
}

export interface Customer {
  name: string;
  phone: string;
  address?: string;
}

export interface FooterConfig {
  enabled: boolean;
  companyName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
}