export const URI = 'Nullable';

export type URI = typeof URI;

export type Nullable<A> = A | null | undefined;

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    [URI]: Nullable<A>
  }
};
