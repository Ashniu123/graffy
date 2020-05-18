export function page(object, key = '', end = '\uffff') {
  if (typeof object === 'object' && object) {
    Object.defineProperty(object, '_rng_', { value: { key, end } });
  }
  return object;
}

export function bounded(array, bounds) {
  array.bounds = bounds;
  return array;
}

export function link(path, object = {}) {
  return { _ref_: path, ...object };
}

export function scalar(value) {
  if (typeof value === 'object' && value) {
    Object.defineProperty(value, '_val_', { value: true });
  }
  return value;
}
