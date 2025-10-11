export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  emailVerified: boolean;
}

export interface IAuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}