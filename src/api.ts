import { User, UserRole, Product, Order } from './types';

const API_BASE_URL = 'http://localhost:5000';

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login gagal');
    localStorage.setItem('agroforge_token', data.token);
    return data;
  },

  async register(name: string, email: string, password: string, role: UserRole, farmName?: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, farmName }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registrasi gagal');
    localStorage.setItem('agroforge_token', data.token);
    return data;
  },

  getToken(): string | null {
    return localStorage.getItem('agroforge_token');
  },

  logout(): void {
    localStorage.removeItem('agroforge_token');
  },

  // Products
  async getProducts(params?: Record<string, string>): Promise<Product[]> {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await fetch(`${API_BASE_URL}/products${query}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal memuat produk');
    return data;
  },

  async getProductById(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal memuat detail produk');
    return data;
  },

  async createProduct(product: Partial<Product>): Promise<Product> {
    const token = this.getToken();
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal membuat produk');
    return data;
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    const token = this.getToken();
    const res = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal memuat pesanan');
    return data;
  },

  async createOrder(order: Partial<Order>): Promise<Order> {
    const token = this.getToken();
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal membuat pesanan');
    return data;
  },

  // Admin
  async getAdminStats(): Promise<any> {
    const token = this.getToken();
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal memuat statistik admin');
    return data;
  },

  async getComplaints(): Promise<any[]> {
    const token = this.getToken();
    const res = await fetch(`${API_BASE_URL}/admin/complaints`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal memuat komplain');
    return data;
  },

  async resolveComplaint(id: string): Promise<any> {
    const token = this.getToken();
    const res = await fetch(`${API_BASE_URL}/admin/complaints/${id}/resolve`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal update komplain');
    return data;
  },

  async getSellers(): Promise<any[]> {
    const token = this.getToken();
    const res = await fetch(`${API_BASE_URL}/admin/sellers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal memuat penjual');
    return data;
  },
};
