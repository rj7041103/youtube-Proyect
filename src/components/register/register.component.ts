import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppserviceService } from '../../service/appservice.service';
import { ColorserviceService } from '../../service/colorservice.service';

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
    const loginData = {
      name: this.name.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.pwd.nativeElement.value,
    };

    this.login(loginData);
    this.router.navigateByUrl('');
  }
}
