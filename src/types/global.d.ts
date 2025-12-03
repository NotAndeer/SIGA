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
