export async function tryToCatch(fn, ...args) {
  try {
    return [null, await fn(...args)];
  } catch (err) {
    return [err, null];
  };
};