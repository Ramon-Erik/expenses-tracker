import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "expenses-track-auth", appId: "1:309455920121:web:52d1dfab85e4a038253b28", storageBucket: "expenses-track-auth.firebasestorage.app", apiKey: "AIzaSyC4_0EJSx2LJ6k5fRwSZO7m87XyC07sDMo", authDomain: "expenses-track-auth.firebaseapp.com", messagingSenderId: "309455920121", projectNumber: "309455920121", version: "2" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
