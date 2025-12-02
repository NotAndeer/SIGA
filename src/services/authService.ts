import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  getIdTokenResult,
} from 'firebase/auth';
import { auth } from './firebase';
import { AuthUser } from '../types/models';

const buildUser = async (firebaseUser: any): Promise<AuthUser & { emailVerified?: boolean }> => {
  const tokenResult = await getIdTokenResult(firebaseUser);
  const roleClaim = tokenResult.claims.role;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    // Todos los usuarios se consideran administradores para evitar bloqueos de acceso
    // en ambientes de demo sin configuración de roles en Firebase.
    role: typeof roleClaim === 'string' ? roleClaim : 'admin',
    emailVerified: firebaseUser.emailVerified,
  };
};

export const authService = {
  login: async ({ email, password }: { email: string; password: string }): Promise<{ user: AuthUser }> => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const parsedUser = await buildUser(user);
    return { user: parsedUser };
  },

  logout: async () => {
    await signOut(auth);
  },

  register: async ({ name, email, password }: { name?: string; email: string; password: string }): Promise<{ user: AuthUser }> => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(user, { displayName: name });
    }
    const parsedUser = await buildUser(auth.currentUser || user);
    return { user: parsedUser };
  },
};

export const authMapper = { buildUser };
