export interface UserApp {
  id: number;
  avatar?: string;
  name: string;
  lastname: string;
  email: string;
  ci?: number;
  phone?: number;
  address?: string;
  state?: string;
  city?: string;
  status?: string;
}
export interface LoginApp {
  email: string;
  password: string;
}
export interface Carrusel {
  img: string;
}
