declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void): void;
declare function test(name: string, fn: () => void): void;
declare function beforeEach(fn: () => void): void;
declare function afterEach(fn: () => void): void;

declare function expect<T>(actual: T): {
  toBe(expected: T): void;
  toEqual(expected: unknown): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
};
