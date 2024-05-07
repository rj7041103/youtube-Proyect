import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppserviceService } from '../../service/appservice.service';
import { Avatar } from 'primeng/avatar';

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
  constructor(
    private serviceApp: AppserviceService,
    private router: Router,
  ) {}
  login(user: any): void {
    this.serviceApp.login(user);
  }

  nextPage(): void {
    this.userTemplate.email = this.email.nativeElement.value;
    this.userTemplate.password = this.pwd.nativeElement.value;
    this.userTemplate.status = 'Active';
    console.log(this.userTemplate);
    this.login(this.userTemplate);
    if (
      this.userTemplate.email != 'admin' ||
      this.userTemplate.password != 'root'
    ) {
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
