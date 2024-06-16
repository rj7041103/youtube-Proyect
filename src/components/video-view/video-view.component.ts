import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './video-view.component.html',
  styleUrl: './video-view.component.css',
})
export class VideoViewComponent {}
