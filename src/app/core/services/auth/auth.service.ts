import { inject, Injectable } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  User as IFirebaseUser,
  setPersistence,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { BehaviorSubject, from, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #firebaseAuth = inject(Auth);

  public user$ = new Observable<IFirebaseUser | null>

  constructor() {
    this.setSessionPersistence()
    this.user$ = user(this.#firebaseAuth)
  }

  private setSessionPersistence() {
    setPersistence(this.#firebaseAuth, browserSessionPersistence)
      .then(() => console.log("persistência ativa"))
      .catch(() => console.log("persistência inativa"))
  }

  public login(email: string, password: string) {
    const loginPromise = signInWithEmailAndPassword(this.#firebaseAuth, email, password)
    return from(loginPromise)
  }
  
  private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-credential': 'Email ou senha inválidos',
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuário desativado',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/email-already-in-use': 'Email já está em uso',
      'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
      'auth/operation-not-allowed': 'Operação não permitida',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    };
  return errorMessages[errorCode] || `Erro: ${errorCode}`;
}
}
