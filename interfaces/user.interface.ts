export interface User {
  id: string;
  email: string;
  role: Role;
  apiKey: string;
  createdAt: string;
}

export type Role = 'admin' | 'user';
