import { DestroyRef, inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  browserLocalPersistence,
  setPersistence,
  User as IFirebaseUser,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, catchError, from, map, of, switchMap, take, tap } from 'rxjs';
import { IAuthState, IUser } from './types/auth.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #firebaseAuth = inject(Auth);
  #destroyRef = inject(DestroyRef);

  #authState$ = new BehaviorSubject<IAuthState>({
    user: null,
    loading: false,
    error: null,
  });

  private updateState(newAuthState: Partial<IAuthState>) {
    const currentAuthState = this.#authState$.value
    this.#authState$.next({
      ...currentAuthState,
      ...newAuthState
    })
  }

  public getAuthState() {
    return this.#authState$.asObservable()
  }


  public getUser() {
    return this.#authState$.pipe(
      take(1),
      map(authState => authState.user)
    )
  }

  public getLoadingAuth() {
    return this.#authState$.pipe(
      map(authState => authState.loading)
    )
  }

  public getErrorAuth() {
    return this.#authState$.pipe(
      take(1),
      map(authState => authState.error)
    )
  }

  constructor() {
    this.initializeAuthListener()
  }

  private async setLocalPersistense() {
    try {
      await setPersistence(this.#firebaseAuth, browserLocalPersistence);
    } catch (error) {
      console.warn('Persistência local não disponível:', error);
    }
  }

  private initializeAuthListener() {
    authState(this.#firebaseAuth).pipe(
      takeUntilDestroyed(this.#destroyRef),
      map((firebaseUser: IFirebaseUser | null) => this.mapFirebaseUser(firebaseUser)),
      tap(user => {
        const currentState = this.#authState$.value
        this.#authState$.next({
          ...currentState,
          user,
          loading: false,
          error: null
        })
      }),
      catchError(error => {
        this.#authState$.next({
          user: null,
          loading: false,
          error: error.code
        })
        return of(null)
      })
    ).subscribe();
  }

  private mapFirebaseUser(fbUser: IFirebaseUser | null): IUser | null {
    if (!fbUser) return null
    return {
      uid: fbUser.uid,
      email: fbUser.email,
      displayName: fbUser.displayName,
      photoURL: fbUser.photoURL,
      emailVerified: fbUser.emailVerified
    }
  }

  public login(email: string, password: string) {
    this.updateState({loading: true, error: null})

    return from(this.setLocalPersistense()).pipe(
      switchMap(() => 
        from(signInWithEmailAndPassword(this.#firebaseAuth, email, password))),
      take(1),
      map(() => void 0),
      tap(tap => this.updateState({ loading: false, error: null })),
      catchError(error => this.setError(error)),
    )
  }

  public logout() {
    this.updateState({loading: true})
    
    return from(signOut(this.#firebaseAuth)).pipe(
      take(1),
      tap(() => {
        this.#authState$.next({
          user: null,
          error: null,
          loading: false
        })
      }),
      catchError(error => this.setError(error))
    ) 
  } 

  private setError(error: any) {
    const errorMsg = error.code
    this.updateState({loading: false, error: this.getErrorMessage(errorMsg)})
    return of()
  }

  async getCurrentToken(fresh: boolean) {
    const user = this.#firebaseAuth.currentUser
    if (user) {
      if (fresh) 
        return await user.getIdToken(true)
      else 
        return await user.getIdToken()
    }
    
    return null
  }
    private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
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
