import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PrincipalComponent } from '../components/principal/principal.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'My Youtube Proyect';
}
