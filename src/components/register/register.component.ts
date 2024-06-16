import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppserviceService } from '../../service/appservice.service';
import { ColorserviceService } from '../../service/colorservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') pwd!: ElementRef;
  @ViewChild('name') name!: ElementRef;

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
    const loginData = {
      name: this.name.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.pwd.nativeElement.value,
    };

    this.login(loginData);
    this.router.navigateByUrl('');
  }
}
