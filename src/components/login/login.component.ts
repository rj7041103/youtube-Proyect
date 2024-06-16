import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppserviceService } from '../../service/appservice.service';
import { Avatar } from 'primeng/avatar';
import { ColorserviceService } from '../../service/colorservice.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') pwd!: ElementRef;
  id = 52;
  userTemplate = {
    Avatar: '',
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
  private serviceColor = inject(ColorserviceService);

  principalUserColor = '';
  secundaryUserColor = '';
  neutralBUserColor = '';
  neutralWUserColor = '';
  complementUserColor = '';
  paragraphSizeUser = '';
  subtitleSizeUser = '';
  titleSizeUser = '';
  private subscription: Subscription;
  constructor(
    private serviceApp: AppserviceService,
    private router: Router,
  ) {}
  login(user: any): void {
    this.serviceApp.login(user);
  }

  ngOnInit(): void {
    this.subscription = this.serviceColor
      .obtenerDatos('newPrincipalColor')
      .subscribe((color) => {
        this.principalUserColor = color;
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newSecundaryColor')
      .subscribe((color) => {
        this.secundaryUserColor = color;
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newNeutralBColor')
      .subscribe((color) => {
        this.neutralBUserColor = color;
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newNeutralWColor')
      .subscribe((color) => {
        this.neutralWUserColor = color;
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newComplementColor')
      .subscribe((color) => {
        this.complementUserColor = color;
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newParagraphSizeUser')
      .subscribe((color) => {
        this.paragraphSizeUser = color + 'px';
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newSubtitleSizeUser')
      .subscribe((color) => {
        this.subtitleSizeUser = color + 'px';
      });
    this.subscription = this.serviceColor
      .obtenerDatos('newTitleSizeUser')
      .subscribe((color) => {
        this.titleSizeUser = color + 'px';
      });
  }

  nextPage(): void {
    this.userTemplate.email = this.email.nativeElement.value;
    this.userTemplate.password = this.pwd.nativeElement.value;
    this.userTemplate.status = 'true';
    //this.serviceApp.postUser(this.userTemplate);
    this.login(this.userTemplate);
    try {
      if (
        this.userTemplate.email != 'admin@gmail.com' ||
        this.userTemplate.password != '123456789'
      ) {
        if (this.userTemplate.email != '' && this.userTemplate.password != '') {
          this.serviceApp.postUser(this.userTemplate);
          this.router.navigateByUrl('');
        }
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    } catch (err) {
      alert('Hubo un error');
    }
  }
  generarId() {
    this.id += 1;
  }
}
