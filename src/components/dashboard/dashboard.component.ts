import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Customer } from '../../interfaces/Customer';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    TableModule,
    DropdownModule,
    FormsModule,
    TagModule,
    CommonModule,
    AvatarGroupModule,
    AvatarModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  customers: Customer[] = [
    {
      id: 1,
      img: '../../assets/images/profile/user-1.jpg',
      name: 'James',
      lastname: 'Bond',
      email: 'james@gmail.com',
      phone: 123456789,
      address: 'Ciudad Alianza sector 1',
      state: 'Carabobo',
      city: 'Valencia',
      dni: 123456789,
      status: 'Active',
    },
    {
      id: 2,
      img: '../../assets/images/profile/user-2.jpg',
      name: 'Ana',
      lastname: 'Volpica',
      email: 'ana@gmail.com',
      phone: 112857581,
      address: 'Guacara la Granja',
      state: 'Carabobo',
      city: 'Valencia',
      dni: 124861773,
      status: 'Active',
    },
    {
      id: 3,
      img: '../../assets/images/profile/user-3.jpg',
      name: 'Arturo',
      lastname: 'Gonzales',
      email: 'ArturGon@gmail.com',
      phone: 101153379,
      address: 'Petare',
      state: 'Caracas',
      city: 'Caracas',
      dni: 152010232,
      status: 'Active',
    },
    {
      id: 4,
      img: '../../assets/images/profile/user-4.jpg',
      name: 'Mario',
      lastname: 'Hernandez',
      email: 'MHernades2021@gmail.com',
      phone: 132451667,
      address: 'Santa Ana de la cruz',
      state: 'Aragua',
      city: 'Maracay',
      dni: 301227869,
      status: 'Active',
    },
    {
      id: 5,
      img: '../../assets/images/profile/user-1.jpg',
      name: 'Majo',
      lastname: 'Martinez',
      email: 'Majo@gmail.com',
      phone: 124476501,
      address: '23 de Enero',
      state: 'Caracas',
      city: 'Caracas',
      dni: 324152280,
      status: 'Active',
    },
  ];
  loading?: boolean = false;
  searchText: string = '';
  showComponent = false; // Variable para controlar la visibilidad del componente

  onFilter(value: string) {
    this.customers = this.customers.filter(
      (customer) =>
        customer.name.includes(value) ||
        customer.lastname.includes(value) ||
        (customer.status && customer.status.includes(value)),
    );
  }

  toggleComponentVisibility() {
    this.showComponent = !this.showComponent; // Cambia el valor de la variable
  }

  trackCustomer(index: number, customer: any): any {
    return customer.id;
  }

  getSeverity(status: string | undefined): string {
    return status === 'Active' ? 'success' : 'danger';
  }
}
