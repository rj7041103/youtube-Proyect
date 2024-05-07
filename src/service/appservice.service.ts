import { Injectable } from '@angular/core';
import { User } from '../interfaces/UserInterface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppserviceService {
  API_URL: string = 'https://663997331ae792804bec3345.mockapi.io/api/v1/users';
  token = 'currentUser';

  constructor(private serviceApi: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.serviceApi.get<User[]>(this.API_URL).pipe(map((res) => res));
  }
  login(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
  isAuthenticated(): boolean {
    return this.token.length > 0;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  getUserById(id: string): Observable<User> {
    return this.serviceApi
      .get<User>(`${this.API_URL}/${id}`)
      .pipe(map((res) => res));
  }

  postUser(user: any): Observable<any> {
    return this.serviceApi
      .post(`${this.API_URL}`, user)
      .pipe(map((res) => res));
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.serviceApi
      .put(`${this.API_URL}/${id}`, user)
      .pipe(map((res) => res));
  }

  deleteUser(id: string): Observable<any> {
    return this.serviceApi
      .delete(`${this.API_URL}/${id}`)
      .pipe(map((res) => res));
  }

  // Asumiendo que "service" es un método para activar un usuario
  activateUser(id: string): Observable<any> {
    return this.serviceApi
      .delete(`${this.API_URL}/${id}`)
      .pipe(map((res) => res));
  }
}
