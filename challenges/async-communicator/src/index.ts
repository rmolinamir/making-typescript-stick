import { expectType } from "tsd";

// IMPLEMENT THIS TYPE
export type WrapForPenpal<T> = T extends object
  ? {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R
      ? (...args: A) => R extends Promise<unknown> ? R : Promise<R>
      : T[K]
  }
  : never;

/**
 * Test Scenario - Do not change anything below this line
 */
const methods = {
  add(a: number, b: number): number {
    return a + b;
  },
  addAsync(a: number, b: number): Promise<number> {
    return Promise.resolve(a + b);
  },
  subtract(a: number, b: number): number {
    return a - b;
  },
};
const asyncMethods: WrapForPenpal<typeof methods> = {} as any;

let addPromise = asyncMethods.add(1, 2);
expectType<Promise<number>>(addPromise);
// @ts-expect-error
expectType<typeof addPromise>("this should fail");

let addAsyncPromise = asyncMethods.addAsync(1, 2);
expectType<Promise<number>>(addAsyncPromise);
// @ts-expect-error
expectType<typeof addAsyncPromise>("this should fail");

let subtractPromise = asyncMethods.subtract(1, 2);
expectType<Promise<number>>(subtractPromise);
// @ts-expect-error
expectType<typeof subtractPromise>("this should fail");
