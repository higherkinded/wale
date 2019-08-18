export const URI = 'Promise';

export type URI = typeof URI;

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    [URI]: Promise<A>
  }
}
