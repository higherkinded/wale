import { URIS, Kind } from 'fp-ts/lib/HKT';
import { URI as IdentityURI } from 'fp-ts/lib/Identity';

import { Async1 } from '../common/function';
import { URI as NullableURI } from '../hkt/Nullable';


export type EventListener<E extends Event> = Async1<E, void>;

export type FocusListener = EventListener<FocusEvent>;
export type MouseListener = EventListener<MouseEvent>;
export type KeyboardListener = EventListener<KeyboardEvent>;

export interface ListenersT<F extends URIS> {
  onblur: Kind<F, FocusListener>
  onclick: Kind<F, MouseListener>
  onfocus: Kind<F, FocusListener>
  onfocusin: Kind<F, FocusListener>
  onfocusout: Kind<F, FocusListener>
  onhover: Kind<F, MouseListener>
  onkeypress: Kind<F, KeyboardListener>
  onmousedown: Kind<F, MouseListener>
  onmouseup: Kind<F, MouseListener>
};

export type Listeners = ListenersT<NullableURI>;
export type ListenersStrict = ListenersT<IdentityURI>;
