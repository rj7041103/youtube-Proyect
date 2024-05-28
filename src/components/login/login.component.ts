import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppserviceService } from '../../service/appservice.service';
import { Avatar } from 'primeng/avatar';
import { ColorserviceService } from '../../service/colorservice.service';
import { CommonModule } from '@angular/common';
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

  principalUserColor = this.serviceColor.newPrincipalColor;
  secundaryUserColor = this.serviceColor.newSecundaryColor;
  neutralBUserColor = this.serviceColor.newNeutralBColor;
  neutralWUserColor = this.serviceColor.newNeutralWColor;
  complementUserColor = this.serviceColor.newComplementColor;
  paragraphSizeUser = this.serviceColor.newParagraphSizeUser;
  subtitleSizeUser = this.serviceColor.newSubtitleSizeUser;
  titleSizeUser = this.serviceColor.newTitleSizeUser;
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
    this.userTemplate.status = 'true';
    //this.serviceApp.postUser(this.userTemplate);
    this.login(this.userTemplate);
    try {
      if (
        this.userTemplate.email != 'admin' ||
        this.userTemplate.password != 'root'
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
