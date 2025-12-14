import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  getIdTokenResult,
  User,
} from 'firebase/auth';
import { auth } from './firebase';

export type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
  emailVerified: boolean;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterData = {
  name?: string;
  email: string;
  password: string;
};

const buildUser = async (firebaseUser: User): Promise<AppUser> => {
  const tokenResult = await getIdTokenResult(firebaseUser);

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    role: (tokenResult.claims as any)?.role || 'miembro',
    emailVerified: firebaseUser.emailVerified,
  };
};

export const authService = {
  login: async ({ email, password }: LoginCredentials) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const parsedUser = await buildUser(user);
    return { user: parsedUser };
  },

  logout: async () => {
    await signOut(auth);
  },

  register: async ({ name, email, password }: RegisterData) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    if (name) {
      await updateProfile(user, { displayName: name });
    }

    const parsedUser = await buildUser(auth.currentUser || user);
    return { user: parsedUser };
  },
};

export const authMapper = {
  buildUser,
};
