import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EstadoVenezuela } from '../../interfaces/EstadosVenezuela';
import { AppserviceService } from '../../service/appservice.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AutoCompleteModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  arrVenezuela: EstadoVenezuela[] = [
    { state: 'Amazonas', city: 'Puerto Ayacucho' },
    { state: 'Anzoátegui', city: 'Barcelona' },
    { state: 'Apure', city: 'San Fernando de Apure' },
    { state: 'Aragua', city: 'Maracay' },
    { state: 'Barinas', city: 'Barinas' },
    { state: 'Bolívar', city: 'Angostura' },
    { state: 'Carabobo', city: 'Valencia' },
    { state: 'Cojedes', city: 'San Carlos' },
    { state: 'Delta Amacuro', city: 'Tucupita' },
    { state: 'Dependencias Federales', city: 'Caracas' },
    { state: 'Distrito Capital', city: 'Caracas' },
    { state: 'Guárico', city: 'San Juan de Los Morros' },
    { state: 'Lara', city: 'Barquisimeto' },
    { state: 'Mérida', city: 'Mérida' },
    { state: 'Miranda', city: 'Los Teques' },
    { state: 'Monagas', city: 'Maturín' },
    { state: 'Nueva Esparta', city: 'La Asunción' },
    { state: 'Portuguesa', city: 'Acarigua' },
    { state: 'Sucre', city: 'Cumaná' },
    { state: 'Táchira', city: 'San Cristóbal' },
    { state: 'Trujillo', city: 'Valera' },
    { state: 'Zulia', city: 'Maracaibo' },
    { state: 'Vargas', city: 'La Guaira' },
    { state: 'Yaracuy', city: 'San Felipe' },
    { state: 'Zamora', city: 'Rodeo' },
  ];

  //Inputs de los formularios
  @ViewChild('image') inputImage!: ElementRef;
  @ViewChild('name') inputName!: ElementRef;
  @ViewChild('lastname') inputLastname!: ElementRef;
  @ViewChild('ci') inputCi!: ElementRef;
  @ViewChild('email') inputEmail!: ElementRef;
  @ViewChild('address') inputAddres!: ElementRef;
  @ViewChild('phone') inputPhone!: ElementRef;
  @ViewChild('city') inputCity!: ElementRef;
  @ViewChild('state') inputState!: ElementRef;

  postUserTemplate = {
    id: '52',
    avatar: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    ci: 0,
    phone: 0,
    address: '',
    state: '',
    city: '',
    status: '',
  };

  selectedState: string | null = null;
  selectedCity: string | null = null;
  // Lista filtrada que se mostrará en el componente <p-autoComplete>
  filteredStates: EstadoVenezuela[] = [];
  filteredCities: EstadoVenezuela[] = [];

  constructor(
    private service: AppserviceService,
    private route: Router,
  ) {}
  filterStates(event: any): EstadoVenezuela[] {
    const query = event.query;
    this.filteredStates = this.arrVenezuela.filter((state) =>
      state.state.toLowerCase().includes(query.toLowerCase()),
    );
    return this.filteredStates;
  }

  filterCities(event: any): EstadoVenezuela[] {
    const query = event.query;
    this.filteredCities = this.arrVenezuela.filter((state) =>
      state.city.toLowerCase().includes(query.toLowerCase()),
    );
    return this.filteredStates;
  }

  // Función para manejar el evento de cambio (opcional)
  onStateChange(event: any) {
    console.log('Country selected:', event.value);
    this.postUserTemplate.state = event.value;
    // Aquí puedes agregar lógica adicional al seleccionar un país
  }
  onCityChange(event: any) {
    console.log('City selected:', event.value);
    this.postUserTemplate.city = event.value;
    // Aquí puedes agregar lógica adicional al seleccionar un país
  }

  upLoadChanges() {
    this.postUserTemplate.avatar =
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/413.jpg';
    this.postUserTemplate.name = this.inputName.nativeElement.value;
    this.postUserTemplate.lastname = this.inputLastname.nativeElement.value;
    this.postUserTemplate.email = this.inputEmail.nativeElement.value;
    this.postUserTemplate.ci = this.inputCi.nativeElement.value;
    this.postUserTemplate.phone = this.inputPhone.nativeElement.value;
    this.postUserTemplate.address = this.inputAddres.nativeElement.value;
    this.postUserTemplate.status = 'true';
    console.log(this.postUserTemplate);
    this.service.postUser(this.postUserTemplate);
    this.route.navigateByUrl('');
  }
}
