import { Injectable, inject, signal } from '@angular/core'; // Elimina 'inject' de aquí
import { Observable, map } from 'rxjs';
import { Storage, ref } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { UserFirebaseAutenticationService } from '../../autentication/user-firebase-autentication.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  uploadProgress$!: Observable<number>;
  progressStatus = signal<number>(0);
  downloadUrl$!: Observable<string>; // Corrección de nombre de variable
  autenticationService = inject(UserFirebaseAutenticationService);
  private storage: Storage; // Remueve la inicialización incorrecta

  constructor(storage: Storage) {
    this.storage = storage;
  }

  UploadFile(file: File) {
    let userData = localStorage.getItem('currentUser'); // Reemplaza 'user' con la clave que usaste para guardar los datos
    if (userData) {
      const userLogged = JSON.parse(userData);
      const filepath = `${userLogged.name}/${file.name}`;
      const fileRef = ref(this.storage, filepath);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          this.progressStatus.set(progress);
        },
        (error) => {
          console.log('Error uploading the video: ', error);
        },
        async () => {
          const url = await getDownloadURL(fileRef);
          console.log('The file URL is: ', url);
        },
      );
    } else {
      console.log('No hay datos del usuario en localStorage');
    }
  }
}
