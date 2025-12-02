import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  getIdTokenResult,
} from 'firebase/auth';
import { auth } from './firebase';

const buildUser = async (firebaseUser) => {
  const tokenResult = await getIdTokenResult(firebaseUser);
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    // Todos los usuarios se consideran administradores para evitar bloqueos de acceso
    // en ambientes de demo sin configuración de roles en Firebase.
    role: tokenResult.claims.role || 'admin',
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
