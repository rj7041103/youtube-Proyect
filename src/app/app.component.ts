import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PrincipalComponent } from '../components/principal/principal.component';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'My Youtube Proyect';
  ngOnInit(): void {
    initFlowbite();
  }
}
