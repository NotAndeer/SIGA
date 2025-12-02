export interface Member {
  id: string;
  name: string;
  email: string;
  profession?: string;
  joinDate?: string;
  status?: string;
  phone?: string;
  address?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  capacity?: number;
  status?: string;
  category?: string;
}

export interface TransactionItem {
  id: string;
  type: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  status?: string;
}

export interface AuthUser {
  uid: string;
  email: string;
  name?: string;
  displayName?: string;
  photoURL?: string;
  role?: string;
}
