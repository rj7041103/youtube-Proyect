import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppserviceService } from '../../service/appservice.service';

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
  constructor(private serviceApp: AppserviceService) {}
  login(user: any): void {
    this.serviceApp.login(user);
  }

  nextPage(): void {
    const loginData = {
      name: this.name.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.pwd.nativeElement.value,
    };
    this.login(loginData);
  }
}
