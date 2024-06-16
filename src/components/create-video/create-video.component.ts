import { Component, inject } from '@angular/core';
import { UploadService } from '../../service/youtube/uploadVideos/upload.service';
import { UserFirebaseAutenticationService } from '../../service/autentication/user-firebase-autentication.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-create-video',
  standalone: true,
  imports: [],
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.css',
})
export class CreateVideoComponent {
  private video: File;
  uploadProgress: number = this.videoService.progressStatus();
  constructor(
    private videoService: UploadService,
    private autenticationService: UserFirebaseAutenticationService,
  ) {}

  ngOnInit() {
    console.log(
      'Estos son los datos:',
      this.autenticationService
        .obtenerDatos()
        .subscribe((users) =>
          map((users) => console.log('users individuales: ', users)),
        ),
    );
  }
  selectVideo(event: any) {
    this.video = event.target.files[0];
    console.log('Este es la info del video: ', this.video);
  }

  uploadVideo() {
    this.videoService.UploadFile(this.video);
  }
}
