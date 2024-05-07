export interface User {
  id: number;
  avatar?: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  ci?: number;
  phone?: number;
  address?: string;
  state?: string;
  city?: string;
  status?: string;
}
