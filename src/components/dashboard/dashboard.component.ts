import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { UserApp } from '../../interfaces/Customer';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AppserviceService } from '../../service/appservice.service';
import { User } from '../../interfaces/UserInterface';
import { map, of, switchMap } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
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
    AutoCompleteModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  customers: UserApp[] = [
    {
      id: 1,
      avatar: '../../assets/images/profile/user-1.jpg',
      name: 'James',
      lastname: 'Bond',
      email: 'james@gmail.com',
      phone: 123456789,
      address: 'Ciudad Alianza sector 1',
      state: 'Carabobo',
      city: 'Valencia',
      ci: 123456789,
      status: 'Active',
    },
    {
      id: 2,
      avatar: '../../assets/images/profile/user-2.jpg',
      name: 'Ana',
      lastname: 'Volpica',
      email: 'ana@gmail.com',
      phone: 112857581,
      address: 'Guacara la Granja',
      state: 'Carabobo',
      city: 'Valencia',
      ci: 124861773,
      status: 'Active',
    },
    {
      id: 3,
      avatar: '../../assets/images/profile/user-3.jpg',
      name: 'Arturo',
      lastname: 'Gonzales',
      email: 'ArturGon@gmail.com',
      phone: 101153379,
      address: 'Petare',
      state: 'Caracas',
      city: 'Caracas',
      ci: 152010232,
      status: 'Active',
    },
    {
      id: 4,
      avatar: '../../assets/images/profile/user-4.jpg',
      name: 'Mario',
      lastname: 'Hernandez',
      email: 'MHernades2021@gmail.com',
      phone: 132451667,
      address: 'Santa Ana de la cruz',
      state: 'Aragua',
      city: 'Maracay',
      ci: 301227869,
      status: 'Active',
    },
    {
      id: 5,
      avatar: '../../assets/images/profile/user-1.jpg',
      name: 'Majo',
      lastname: 'Martinez',
      email: 'Majo@gmail.com',
      phone: 124476501,
      address: '23 de Enero',
      state: 'Caracas',
      city: 'Caracas',
      ci: 324152280,
      status: 'Active',
    },
  ];

  userlist!: any[];
  //Cargamos los resultados de la api
  private usersArr = inject(AppserviceService);
  users$ = this.usersArr.getUsers();

  loading?: boolean = false;
  searchText: string = '';
  showComponent = false; // Variable para controlar la visibilidad del componente
  showDialog = false;
  //Iniciamos el arry de userlist para filtrar la tabla
  ngOnInit(): void {
    this.users$ = this.usersArr.getUsers();
    this.users$.subscribe((users) => (this.userlist = users));
  }

  //funcion de filtrado
  onFilter(query: string) {
    if (!query.trim()) {
      // Si la consulta está vacía, muestra todos los usuarios
      this.users$ = of(this.userlist);
      return;
    }
    // Filtra los usuarios basándose en el nombre o apellido
    this.users$ = of(
      this.userlist.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.company.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }

  toggleComponentVisibility() {
    this.showComponent = !this.showComponent; // Cambia el valor de la variable
  }

  toggleShowVisibility() {
    this.showDialog = !this.showDialog;
    console.log('el resultado es:', this.showDialog);
  }

  trackUser(index: number, customer: any): any {
    return customer.id;
  }

  getSeverity(status: string | undefined): string {
    return status === 'Active' ? 'success' : 'danger';
  }
}
