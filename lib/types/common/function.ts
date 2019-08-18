import { Kind, URIS } from 'fp-ts/lib/HKT';
import { URI as IdentityURI } from 'fp-ts/lib/Identity';
import { URI as PromiseURI } from '../hkt/Promise';

export type Func1T<F1 extends URIS, F2 extends URIS, A, B>
  = (e: Kind<F1, A>) => Kind<F2, B>;

export type Func1CodomainT<F extends URIS, A, B> = Func1T<IdentityURI, F, A, B>;

export type Func1<A, B> = Func1CodomainT<IdentityURI, A, B>;

export type Async1<A, B> = Func1CodomainT<PromiseURI, A, B>;
