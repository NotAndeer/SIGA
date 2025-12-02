declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  const content: string;
  export default content;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export as namespace React;
  export type ReactNode = any;
  export interface FC<P = {}> {
    (props: P & { children?: ReactNode }): any;
  }
  export const createContext: any;
  export const useContext: any;
  export const useEffect: any;
  export const useState: any;
  export const useMemo: any;
  export const useReducer: any;
  export const useCallback: any;
  export const useRef: any;
  export const Fragment: any;
  export const memo: any;
  const React: any;
  export default React;
}

declare module 'react-dom' {
  export const render: any;
  export const createPortal: any;
}

declare module 'react-dom/client' {
  export const createRoot: any;
}

declare module 'react-router-dom' {
  export const BrowserRouter: any;
  export const Routes: any;
  export const Route: any;
  export const Navigate: any;
  export const Link: any;
  export const useNavigate: any;
  export const useLocation: any;
  export const useParams: any;
}

declare module 'axios' {
  const axios: any;
  export default axios;
}

declare module 'firebase/app' {
  export const initializeApp: any;
}

declare module 'firebase/auth' {
  export const getAuth: any;
  export const onAuthStateChanged: any;
  export const createUserWithEmailAndPassword: any;
  export const signInWithEmailAndPassword: any;
  export const signOut: any;
  export const GoogleAuthProvider: any;
  export const signInWithPopup: any;
  export const sendPasswordResetEmail: any;
  export const updateProfile: any;
  export const getIdTokenResult: any;
}

declare module 'web-vitals' {
  export const getCLS: any;
  export const getFID: any;
  export const getFCP: any;
  export const getLCP: any;
  export const getTTFB: any;
}

declare const process: any;
declare const module: any;

// Basic Jest globals for environments without @types/jest
declare function describe(name: string, fn: () => void): void;
declare function test(name: string, fn: (...args: any[]) => any): void;
declare function it(name: string, fn: (...args: any[]) => any): void;
declare function expect(value: any): any;
