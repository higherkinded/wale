import { Component } from "./types/dom/Component";


/**
 * Memoize a function, remembering `n` of its latest results. If limit is set to
 * zero or omitted, doesn't care of limits and writes down everything,
 * eventually turning into one big memory leak for everything wide enough domain
 * or codomain. That said, it must be used sparingly and with limits defined.
 *
 * Idempotent pure functions as well as somehow-idempotent impure functions 
 * (i.e. they must have effects that don't really affect anything but their own
 * return value, so these effects must be some reliable read effects) may easily
 * get memoized to reduce the number of effectful calls as well as running time.
 */
export const memo = (f: Function, limit: number = 0) => {
  const mem = new Map();
  let lastArgs: string[] = [];

  /**
   * Remember the argument, ensure that the limits are respected. 
   */
  const __rememberArg = (arg: string) => {
    // Record the argument to track the order of future deletions.
    lastArgs.push(arg);
    if (lastArgs.length > limit)
      // Forget the earliest call if the limit is reached.
      mem.delete(lastArgs.shift());
  };

  return async (..._args: any[]) => {
    // Avoid writing down more args than required.
    const args = _args.slice(0, f.length);

    // Serialize the arguments to get a key.
    const key = JSON.stringify(args);

    // Lookup the args and return known result if found.
    if (mem.has(key))
      return mem.get(key);

    // If it didn't go very well, get it by making an actual call and cache it.
    const result = await f(...args);
    mem.set(key, result);

    // Did the call site specify the limit for memoization? Remember the order.
    if (limit > 0)
      __rememberArg(key);

    return result;
  };
};


export default memo;
