import { api } from './client';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: string;
  branchId?: string;
}

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
}

export const auth = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/customer/login', { email, password }),

  register: (data: { fullName: string; email: string; phone: string; password: string }) =>
    api.post<AuthResponse>('/auth/customer/register', data),

  logout: () => api.post<void>('/auth/customer/logout', {}),

  getProfile: () => api.get<AuthUser>('/customers/profile'),

  updateProfile: (data: Partial<AuthUser>) =>
    api.patch<AuthUser>('/customers/profile', data),
};
