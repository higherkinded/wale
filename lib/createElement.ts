import { Dict } from './types/common/collection';
import { Nullable } from './types/hkt/Nullable';
import { VirtualElement } from './types/dom/Element';
import { Props } from './types/dom';

export const createElement =
  (
    el: string | Function | Promise<VirtualElement>,
    props: Nullable<Props>,
    ...children: Array<string | VirtualElement>
  ): VirtualElement =>
    ({
      el,
      props: props || {},
      children,
    });
