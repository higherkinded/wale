import { Dict } from '../types/common/collection';

export const attrNameMap: Dict<string> = {
  className: 'class',
};

const attrNames = Object.keys(attrNameMap);

export const renameAttributes = (attrs: Dict<any>): Dict<any> => {
  Object.keys(attrs).map(k => {
    if (attrNames.includes(k)) {
      attrs[attrNameMap[k]] = attrs[k];
      delete attrs[k];
    }
  });
  return attrs;
};
