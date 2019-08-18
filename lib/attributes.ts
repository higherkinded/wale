import { CSSProperties } from './types/dom/CSSProperties';
import { Nullable } from './types/hkt/Nullable';
import { Dict } from './types/common/collection';
import { Props } from './types/dom';
import { renameAttributes } from './constants/attributes';

const domStyleKeys: string[] = Object.keys(
  document.createElement('div').style,
);


const setAttr = async (
  el: HTMLElement,
  name: string,
  value: any = "",
) => {
  const newVal = String(value)
  if (newVal.length) el.setAttribute(name, newVal);
  else el.removeAttribute(name);
};


const setListener = async (
  el: HTMLElement,
  name: string,
  value?: Function,
) => {
  // @ts-ignore Sorry, I just need to do this.
  el[name.toLowerCase()] = value;
}


const compareAndSetStyle = async (
  decl: any,
  prop: string,
  nextVal: any,
) => { if (nextVal !== decl[prop]) decl[prop] = nextVal };


const setStyle = async (
  el: HTMLElement,
  style: Nullable<CSSProperties>,
) => {
  if (style) Object
    .entries(style)
    .forEach(([k, v]) => compareAndSetStyle(el.style, k, v));
}


export const setAttributes = async (
  el: HTMLElement,
  props: Props
) => {
  const listeners: Dict<Function> = {};
  const attrs: Dict<any> = {};
  const style = { ...props.style };

  setStyle(el, style);
  delete props.style;

  renameAttributes(props);

  // Separate props into 
  Object.entries(props).forEach(([k, v]) => {
    if (k.startsWith('on') && typeof v === 'function')
      listeners[k] = v;
    else attrs[k] = v;
  });

  Object.entries(listeners).map(([k, v]) => setListener(el, k, v));
  Object.entries(attrs).map(([k, v]) => setAttr(el, k, v));
};
