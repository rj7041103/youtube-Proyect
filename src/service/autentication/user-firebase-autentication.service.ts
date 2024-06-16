import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserFirebaseAutenticationService {
  private auth: any;

  constructor(private firestore: AngularFirestore) {
    this.auth = getAuth();
    console.log('este es el usuario: ', this.auth);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('Usuario autenticado:', user);
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  getUser() {
    return this.auth.currentUser;
  }

  obtenerDatos(): Observable<any[] | null> {
    return this.firestore
      .collection('users')
      .valueChanges()
      .pipe(
        map((documents) => {
          if (documents.length > 0) {
            // Aquí simplemente retornamos el arreglo de documentos sin procesarlos más
            console.log('Los datos de los usuarios son: ', documents);
            return documents; // Retorna el arreglo completo de documentos
          } else {
            console.log('No se encontraron documentos.');
            return null; // Retorna null si no hay documentos
          }
        }),
        catchError((error) => {
          console.error('Error obteniendo datos:', error);
          return of(null); // Retorna null en caso de error
        }),
      );
  }
}
