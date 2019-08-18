import { Dict } from "./collection";

export const
  change = 'change',
  create = 'create',
  remove = 'remove';

export type change = typeof change;
export type create = typeof create;
export type remove = typeof remove;

export type DiffKind
  = change
  | create
  | remove;

export type DiffAtom = {
  kind: DiffKind,
  value: any,
};

const __optiFilter = (
  kA: string[],
  kB: string[],
  kCreated: string[],
  kRemoved: string[],
) => {

};

export const shallowDiff =
  (a: Dict<any>, b: Dict<any>): Map<string, DiffAtom> => {
    const diff = new Map();
    const [keysA, keysB] = [a, b].map(Object.keys);
    const removedKeys = keysA.filter(k => !keysB.includes(k));
    const createdKeys = keysB.filter(k => !keysA.includes(k));
    const changedKeys = keysA
      .filter((k: any) => keysB.includes(k) && keysA[k] !== keysB[k]);

    createdKeys.forEach(k => diff.set(k, { kind: create, value: b[k] }));
    removedKeys.forEach(k => diff.set(k, { kind: remove, value: b[k] }));
    changedKeys.forEach(k => diff.set(k, { kind: change, value: b[k] }));

    return diff;
  };
