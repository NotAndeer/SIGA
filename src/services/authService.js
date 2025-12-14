import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  getIdTokenResult,
} from 'firebase/auth';
import { auth } from './firebase';

// Construye el user de la app desde el user de Firebase
const buildUser = async (firebaseUser) => {
  const tokenResult = await getIdTokenResult(firebaseUser);
  const roleClaim = tokenResult?.claims?.role;

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    // Si no hay roles configurados, por defecto admin para evitar bloqueos en demo
    role: typeof roleClaim === 'string' ? roleClaim : 'admin',
    emailVerified: firebaseUser.emailVerified,
  };
};

export const authService = {
  login: async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const parsedUser = await buildUser(user);
    return { user: parsedUser };
  },

  logout: async () => {
    await signOut(auth);
  },

  register: async ({ name, email, password }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    if (name) {
      await updateProfile(user, { displayName: name });
    }

    const parsedUser = await buildUser(auth.currentUser || user);
    return { user: parsedUser };
  },
};

export const authMapper = { buildUser };
