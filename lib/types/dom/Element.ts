import { CSSProperties } from './CSSProperties';
import { Props } from '.';

export interface VirtualElement {
  el: string | Function | Promise<VirtualElement>
  props: Props
  children: Array<string | VirtualElement>
}
