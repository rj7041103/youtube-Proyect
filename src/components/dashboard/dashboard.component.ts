import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
import { ColorserviceService } from '../../service/colorservice.service';
import { Color, Scheme } from '../../interfaces/ColorInterface';
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

  //Cargamos los resultados de la api
  private service = inject(AppserviceService);
  private serviceColor = inject(ColorserviceService);
  private router = inject(Router);
  users$ = this.service.getUsers();
  userlist!: any[];
  colorsT$: any;
  colorsM$: any;
  colorsC$: any;
  colorlistT!: any;
  colorlistM!: any;
  colorlistC!: any;
  //Variables de estado de los componentes de la app

  loading?: boolean = false;
  searchText: string = '';
  showUserComponent = false;
  showConfigColor = false;
  showDialog = false;
  imageAvatar? = '';
  nameBadgedAvatar? = '';
  idUser = '';
  fontSizeP = 0;

  //elements's edit form
  @ViewChild('avatar') inputAvatar!: ElementRef;
  @ViewChild('name') inputName!: ElementRef;
  @ViewChild('lastname') inputLastname!: ElementRef;
  @ViewChild('ci') inputCi!: ElementRef;
  @ViewChild('email') inputEmail!: ElementRef;
  @ViewChild('address') inputAddres!: ElementRef;
  @ViewChild('phone') inputPhone!: ElementRef;
  @ViewChild('city') inputCity!: ElementRef;
  @ViewChild('state') inputState!: ElementRef;

  //elements's dashboard cofig color

  @ViewChild('principalColor') principalColor!: ElementRef;
  @ViewChild('secondaryColor') secundaryColor!: ElementRef;
  @ViewChild('btnBgColorForm') btnBgColorForm!: ElementRef;
  @ViewChild('fontColorDB') fontColorDB!: ElementRef;
  @ViewChild('fontBtnColorForm') fontBtnColorForm!: ElementRef;
  @ViewChild('paragraphsizeDashboard') paragraphsizeDashboard!: ElementRef;
  @ViewChild('subtitlesizeDashboard') subtitlesizeDashboard!: ElementRef;
  @ViewChild('titlesizeDashboard') titlesizeDashboard!: ElementRef;

  //element's user Interface

  @ViewChild('principalColorUser') principalColorUser!: ElementRef;
  @ViewChild('secondaryColorUser') secundaryColorUser!: ElementRef;
  @ViewChild('neutralColor1') neutralColor1!: ElementRef;
  @ViewChild('neutralColor2') neutralColor2!: ElementRef;
  @ViewChild('complementColorUser') complementColorUser!: ElementRef;
  @ViewChild('titleSizeUser') titleSizeUser!: ElementRef;
  @ViewChild('subtitleSizeUser') subtitleSizeUser!: ElementRef;
  @ViewChild('paragraphSizeUser') paragraphSizeUser!: ElementRef;

  //initial colors and sizes in dashboard

  principalColorDashboard = '#FFFFFF';
  secundaryColorDashboard = '#FCFCFC';
  fontColorDashboard = '#0F172A';
  btnBgDashboardForm = '#1A56DB';
  fontColorBtnDashboardForm = '#FFFFFF';
  fontSizeTitle = '39.51px';
  fontSizeSubtitle = '23.52px';
  fontSizeParagraph = '14px';

  // initial colors and sizes in User interface
  principalColorUserI = '#FFFFFF';
  secundaryColorUserI = '#FFFFFF';
  neutralColorI1 = '#171E26';
  neutralColorI2 = '#F2F2F2';
  complementColorUserI = '#FFFFFF';
  titleSizeUserI = '';
  subtitleSizeUserI = '';
  paragraphSizeUserI = '';

  //section pallet
  triad = {
    t1: this.serviceColor.triad.principal,
    t2: this.serviceColor.triad.secundary,
    t3: this.serviceColor.triad.neutralB,
    t4: this.serviceColor.triad.neutralW,
    t5: this.serviceColor.triad.complement,
  };

  monochrome = {
    m1: this.serviceColor.monochrome.principal,
    m2: this.serviceColor.monochrome.secundary,
    m3: this.serviceColor.monochrome.neutralB,
    m4: this.serviceColor.monochrome.neutralW,
    m5: this.serviceColor.monochrome.complement,
  };

  analogic = {
    a1: this.serviceColor.analogic.principal,
    a2: this.serviceColor.analogic.secundary,
    a3: this.serviceColor.analogic.neutralB,
    a4: this.serviceColor.analogic.neutralW,
    a5: this.serviceColor.analogic.complement,
  };
  userTemplate = {
    id: '',
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

  //Iniciamos el arry de userlist para filtrar la tabla

  ngOnInit(): void {
    this.users$ = this.service.getUsers();
    this.users$.subscribe((users) => (this.userlist = users));

    /* this.colorsT$ = this.serviceColor.getColorsT();
    this.colorsT$.subscribe((colors: any) => (this.colorlistT = colors));

    this.colorsM$ = this.serviceColor.getColorsM();
    this.colorsM$.subscribe((colors: any) => (this.colorlistM = colors));

    this.colorsC$ = this.serviceColor.getColorsC();
    this.colorsC$.subscribe((colors: any) => (this.colorlistC = colors)); */
    this.principalColorUserI = this.serviceColor.analogic.principal;
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
          user.lastname.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }

  //Control Visibility

  toggleComponentVisibility() {
    this.showConfigColor = false;
    this.showUserComponent = !this.showUserComponent;
  }
  toggleComponentVisibilityConfigColor() {
    this.showUserComponent = false;
    this.showConfigColor = !this.showConfigColor;
  }

  toggleShowDialogVisibility(id: string) {
    this.showDialog = !this.showDialog;
    this.idUser = id;
    this.service.getUserById(id).subscribe((valueUser) => {
      //this.inputAvatar.nativeElement.value = valueUser.avatar;
      this.imageAvatar = valueUser.avatar;
      this.nameBadgedAvatar = valueUser.name;
      this.inputName.nativeElement.value = valueUser.name;
      this.inputLastname.nativeElement.value = valueUser.lastname;
      this.inputCi.nativeElement.value = valueUser.ci;
      this.inputEmail.nativeElement.value = valueUser.email;
      this.inputPhone.nativeElement.value = valueUser.phone;
      this.inputAddres.nativeElement.value = valueUser.address;
      this.inputState.nativeElement.value = valueUser.state;
      this.inputCity.nativeElement.value = valueUser.city;
    });
  }

  toggleModal() {
    this.showDialog = !this.showDialog;
  }

  trackUser(index: number, customer: any): any {
    return customer.id;
  }

  getSeverity(status: string | boolean | undefined): string {
    if (status === true || status == 'true') {
      return 'success';
    } else {
      return 'danger';
    }
  }

  updateUserStatus(id: string): void {
    const user = this.userlist.find((user) => user.id === id);
    if (user.status == true || user.status == 'true') {
      user.status = 'false';
      // Aquí puedes llamar a un método del servicio para actualizar el usuario en la base de datos
      this.service.updateUser(id, user);
    } else {
      user.status = 'true';
      // Aquí puedes llamar a un método del servicio para actualizar el usuario en la base de datos
      this.service.updateUser(id, user);
    }
  }

  postUser(id: string) {
    const resultId = parseInt(this.userTemplate.id) + parseInt(id);
    this.userTemplate.id = resultId.toString();
    this.userTemplate.name = this.inputName.nativeElement.value;
    this.userTemplate.lastname = this.inputLastname.nativeElement.value;
    this.userTemplate.ci = this.inputCi.nativeElement.value;
    this.userTemplate.email = this.inputEmail.nativeElement.value;
    this.userTemplate.phone = this.inputPhone.nativeElement.value;
    this.userTemplate.address = this.inputAddres.nativeElement.value;
    this.userTemplate.state = this.inputState.nativeElement.value;
    this.userTemplate.city = this.inputCity.nativeElement.value;
    this.service.updateUser(this.userTemplate.id, this.userTemplate);
    this.toggleModal();
  }
  logout() {
    this.service.logout();
    this.router.navigateByUrl('/login');
  }
  saveChangesDashboard() {
    this.serviceColor.newPrincipalColorDashboard = this.principalColorDashboard;
    this.serviceColor.newSecundaryColorDashboard = this.secundaryColorDashboard;
    this.serviceColor.newBtnBgColorFormDashboard = this.btnBgDashboardForm;
    this.serviceColor.newBtnFontColorFormDashboard =
      this.fontColorBtnDashboardForm;
    this.serviceColor.newParagraphSizeDashboard = this.fontSizeParagraph;
    this.serviceColor.newSubtitleSizeDashboard = this.fontSizeSubtitle;
    this.serviceColor.newTitleSizeDashboard = this.fontSizeTitle;
    this.serviceColor.fontColorDashboard = this.fontColorDashboard;
  }
  saveChangesUser() {
    if (this.serviceColor.typePalletColor != '') {
      switch (this.serviceColor.typePalletColor) {
        case 'triad':
          this.serviceColor.setPalletColorT(
            this.principalColorUserI,
            this.secundaryColorUserI,
            this.neutralColorI1,
            this.neutralColorI2,
            this.complementColorUserI,
          );
          if (this.paragraphSizeUser.nativeElement.value) {
            this.serviceColor.newParagraphSizeUser =
              this.paragraphSizeUser.nativeElement.value;
            this.serviceColor.newSubtitleSizeUser =
              this.subtitleSizeUser.nativeElement.value;
            this.serviceColor.newTitleSizeUser =
              this.titleSizeUser.nativeElement.value;
            alert('success data save');
          } else {
            alert('Please complete all inputs');
          }

          break;

        case 'monochrome':
          this.serviceColor.setPalletColorM(
            this.principalColorUserI,
            this.secundaryColorUserI,
            this.neutralColorI1,
            this.neutralColorI2,
            this.complementColorUserI,
          );
          if (this.paragraphSizeUser.nativeElement.value) {
            this.serviceColor.newParagraphSizeUser =
              this.paragraphSizeUser.nativeElement.value;
            this.serviceColor.newSubtitleSizeUser =
              this.subtitleSizeUser.nativeElement.value;
            this.serviceColor.newTitleSizeUser =
              this.titleSizeUser.nativeElement.value;
            alert('success data save');
          } else {
            alert('Please complete all inputs');
          }

          break;

        case 'analogic':
          this.serviceColor.setPalletColorA(
            this.principalColorUserI,
            this.secundaryColorUserI,
            this.neutralColorI1,
            this.neutralColorI2,
            this.complementColorUserI,
          );
          if (this.paragraphSizeUser.nativeElement.value) {
            this.serviceColor.newParagraphSizeUser =
              this.paragraphSizeUser.nativeElement.value;
            this.serviceColor.newSubtitleSizeUser =
              this.subtitleSizeUser.nativeElement.value;
            this.serviceColor.newTitleSizeUser =
              this.titleSizeUser.nativeElement.value;
            alert('success data save');
          } else {
            alert('Please complete all inputs');
          }

          break;
      }
    } else {
      if (this.paragraphSizeUser.nativeElement.value) {
        this.serviceColor.newPrincipalColor = this.principalColorUserI;
        this.serviceColor.newSecundaryColor = this.secundaryColorUserI;
        this.serviceColor.newNeutralBColor = this.neutralColorI1;
        this.serviceColor.newNeutralWColor = this.neutralColorI2;
        this.serviceColor.newComplementColor = this.complementColorUserI;
        alert('success data save');
      } else {
        alert('Please complete all inputs');
      }
    }
  }
  // section of Text size
  changeSizeTitleSize(paragraphSize: number) {
    this.titlesizeDashboard.nativeElement.value =
      paragraphSize * Math.pow(1.68, 2);
    this.fontSizeTitle = `${this.titlesizeDashboard.nativeElement.value}px`;
  }

  changeSizeSubTitleSize(paragraphSize: number) {
    this.subtitlesizeDashboard.nativeElement.value = paragraphSize * 1.68;
    this.fontSizeSubtitle = `${this.subtitlesizeDashboard.nativeElement.value}px`;
  }

  changeSizeParagraphSize() {
    if (this.paragraphsizeDashboard.nativeElement.value != '') {
      this.changeSizeSubTitleSize(
        this.paragraphsizeDashboard.nativeElement.value,
      );
      this.changeSizeTitleSize(this.paragraphsizeDashboard.nativeElement.value);
      this.fontSizeParagraph = `${this.paragraphsizeDashboard.nativeElement.value}px`;
    } else {
      alert('Ingrese el tamaño de la fuente');
    }
  }

  changeSizeTitleSizeUser(paragraphSize: number) {
    this.titleSizeUser.nativeElement.value = paragraphSize * Math.pow(1.68, 2);
    this.titleSizeUserI = `${this.titleSizeUser.nativeElement.value}px`;
  }

  changeSizeSubTitleSizeUser(paragraphSize: number) {
    this.subtitleSizeUser.nativeElement.value = paragraphSize * 1.68;
    this.subtitleSizeUserI = `${this.subtitleSizeUser.nativeElement.value}px`;
  }

  changeSizeParagraphSizeUser() {
    if (this.paragraphSizeUser.nativeElement.value != '') {
      this.changeSizeSubTitleSizeUser(
        this.paragraphSizeUser.nativeElement.value,
      );
      this.changeSizeTitleSizeUser(this.paragraphSizeUser.nativeElement.value);
      this.paragraphSizeUserI = `${this.paragraphSizeUser.nativeElement.value}px`;
    } else {
      alert('Ingrese el tamaño de la fuente');
    }
  }

  /*   colorPallet() {
    // Limpiar las listas de colores previos
    this.triad = { t1: '', t2: '', t3: '', t4: '', t5: '' };
    this.monochrome = { m1: '', m2: '', m3: '', m4: '', m5: '' };
    this.analogic = { a1: '', a2: '', a3: '', a4: '', a5: '' };
    let cantColorsTriad = [];
    let cantColorsMonochrome = [];
    let cantColorsAnalogic = [];

    // Obtener la paleta de colores para el modo especificado

    if (this.colorlistT && this.colorlistT.colors) {
      this.colorlistT.colors.forEach((element: Color) => {
        cantColorsTriad.push(element.hex.value);
        this.triad.t1 = cantColorsTriad[0];
        this.triad.t2 = cantColorsTriad[1];
        this.triad.t3 = cantColorsTriad[2];
        this.triad.t4 = cantColorsTriad[3];
        console.log(cantColorsTriad);
      });
    }

    if (this.colorlistM && this.colorlistM.colors) {
      this.colorlistM.colors.forEach((element: Color) => {
        cantColorsMonochrome.push(element.hex.value);
        this.monochrome.m1 = cantColorsMonochrome[0];
        this.monochrome.m2 = cantColorsMonochrome[1];
        this.monochrome.m3 = cantColorsMonochrome[2];
        this.monochrome.m4 = cantColorsMonochrome[3];
        console.log(cantColorsMonochrome);
      });
    }

    if (this.colorlistC && this.colorlistC.colors) {
      this.colorlistC.colors.forEach((element: Color) => {
        cantColorsAnalogic.push(element.hex.value);
        this.analogic.a1 = cantColorsAnalogic[0];
        this.analogic.a2 = cantColorsAnalogic[1];
        this.analogic.a3 = cantColorsAnalogic[2];
        this.analogic.a4 = cantColorsAnalogic[3];
        console.log(cantColorsAnalogic);
      });
    }
  } */

  colorPallet() {}

  editPallet(typeMode: string) {
    switch (typeMode) {
      case 'triad':
        this.principalColorUserI = this.serviceColor.triad.principal;
        this.secundaryColorUserI = this.serviceColor.triad.secundary;
        this.neutralColorI1 = this.serviceColor.triad.neutralB;
        this.neutralColorI2 = this.serviceColor.triad.neutralW;
        this.complementColorUserI = this.serviceColor.triad.complement;
        this.serviceColor.typePalletColor = 'triad';
        break;

      case 'monochrome':
        this.principalColorUserI = this.serviceColor.monochrome.principal;
        this.secundaryColorUserI = this.serviceColor.monochrome.secundary;
        this.neutralColorI1 = this.serviceColor.monochrome.neutralB;
        this.neutralColorI2 = this.serviceColor.monochrome.neutralW;
        this.complementColorUserI = this.serviceColor.monochrome.complement;
        this.serviceColor.typePalletColor = 'monochrome';
        break;

      case 'analogic':
        this.principalColorUserI = this.serviceColor.analogic.principal;
        this.secundaryColorUserI = this.serviceColor.analogic.secundary;
        this.neutralColorI1 = this.serviceColor.analogic.neutralB;
        this.neutralColorI2 = this.serviceColor.analogic.neutralW;
        this.complementColorUserI = this.serviceColor.analogic.complement;
        this.serviceColor.typePalletColor = 'analogic';
        break;
    }

    /*     switch (typeMode) {
      case 'triad':
        
        break;

      case 'monochrome':
        this.principalColorUser.nativeElement.value =
          this.serviceColor.monochrome.principal;
        this.secundaryColorUser.nativeElement.value =
          this.serviceColor.monochrome.secundary;
        this.neutralColor1.nativeElement.value =
          this.serviceColor.monochrome.neutralB;
        this.neutralColor2.nativeElement.value =
          this.serviceColor.monochrome.neutralW;
        this.complementColorUser.nativeElement.value =
          this.serviceColor.monochrome.complement;
        break;

      case 'analogic':
        this.principalColorUser.nativeElement.value =
          this.serviceColor.analogic.principal;
        this.secundaryColorUser.nativeElement.value =
          this.serviceColor.analogic.secundary;
        this.neutralColor1.nativeElement.value =
          this.serviceColor.analogic.neutralB;
        this.neutralColor2.nativeElement.value =
          this.serviceColor.analogic.neutralW;
        this.complementColorUser.nativeElement.value =
          this.serviceColor.analogic.complement;
        break;
    } */
  }
}
