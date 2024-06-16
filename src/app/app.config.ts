import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCIeKCINx2LT4Dsvz0zjfP6UvTNEZEMJn8',
  authDomain: 'proyect-e9e97.firebaseapp.com',
  projectId: 'proyect-e9e97',
  storageBucket: 'gs://proyect-e9e97.appspot.com',
  messagingSenderId: '1089016891929',
  appId: '1:1089016891929:web:4acdbd5f709323ffc3b888',
  measurementId: 'G-2TETS45L5P',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule,
    ),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
  ],
};
