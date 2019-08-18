import { Nullable } from "./types/hkt/Nullable";
import { VirtualElement } from "./types/dom/Element";
import { setAttributes } from "./attributes";


const __render = async (
  vel: Nullable<VirtualElement>,
  parent: HTMLElement,
  replace: boolean = false,
): Promise<[Nullable<HTMLElement>, any[]]> => {
  if (!vel) return [null, []];
  const { el, props, children } = vel;
  switch (typeof el) {
    case 'function': {
      return __renderUDC(vel, parent);
    }
    case 'string': {
      const element = document.createElement(el);
      setAttributes(element, props);
      return [element, children];
    }
    default: {
      throw new TypeError(`Unrecognized type: ${typeof vel}`);
    }
  }
}

const __renderUDC = async (
  { el, props, children }: VirtualElement,
  parent: HTMLElement,
) => {
  if (el instanceof Function) {
    return __render(await el(props, children), parent);
  }
  throw TypeError(`${el} is not a functional component.`);
}

const __renderTextNode = async (
  content: any,
  parent: HTMLElement,
) => parent.appendChild(document.createTextNode(String(content)));

/**
 * Render a single child
 */
const renderChild = async (
  child: string | VirtualElement,
  parent: HTMLElement,
) => {
  if (typeof child === 'string')
    parent.appendChild(document.createTextNode(child));
  else render(child, parent);
}

/**
 * Render children ensuring the attachment order. 
 */
const renderChildren = async (
  children: Array<string | VirtualElement>,
  parent: HTMLElement,
) => {
  // Wait for node creation for each child to avoid misordering
  for (let child of children) await renderChild(child, parent);
};

/**
 * Render a node.
 */
async function _render(
  vel: VirtualElement,
  parent: HTMLElement
) {
  const [element, children] = await __render(vel, parent);
  if (parent && element) {
    parent.appendChild(element);
    renderChildren(children, element);
  }
};

async function render(
  vel: VirtualElement | VirtualElement[] | any,
  parent: Nullable<HTMLElement>,
) {
  if (parent) {
    if (vel instanceof Array) { renderChildren(vel, parent); return; }
    if (vel instanceof Object && vel.el) _render(vel, parent);
    else __renderTextNode(vel, parent);
    return;
  }
}

export default render;
