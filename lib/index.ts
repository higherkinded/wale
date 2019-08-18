import { createElement } from './createElement';
import render from './render';
import Jsx from './jsx';

declare global {
  namespace JSX {
    interface IntrinsicElements extends Jsx.IntrinsicElements { }
  }
}

const Wale = {
  createElement,
  e: createElement,
};

export const WaleDOM = {
  render
};

export * from './types/dom';
export default Wale;
