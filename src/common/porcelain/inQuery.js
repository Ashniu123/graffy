import { inParams } from './params';
export const ROOT_KEY = Symbol();

// We freeze constructed queries to guard against bugs that might mutate them.
// TODO: Don't freeze in production builds, as a perf optimization.
const freeze = (obj) => Object.freeze(obj);

function makeNode(object, key, ver) {
  if (!object) return;

  const { _key_, _opt_, ...rest } = object;
  const node = key === ROOT_KEY ? {} : key ? { key } : inParams(_key_ || {});
  node.version = ver;

  if (Array.isArray(object)) {
    const children = object
      .map((obj) => makeNode(obj, undefined, ver))
      .filter(Boolean)
      .sort((a, b) => (a.key <= b.key ? -1 : 1));

    if (children.length) node.children = children;
  } else if (typeof object === 'object') {
    if (key && _key_) {
      node.children = [makeNode(object, undefined, ver)];
    } else {
      const children = Object.keys(rest)
        .sort()
        .map((key) => freeze({ key, ...makeNode(object[key], key, ver) }))
        .filter(Boolean);

      if (children.length) node.children = children;
    }
  } else {
    node.value = typeof object === 'number' ? object : 1;
  }

  if (node.end && !node.children) {
    node.value = 1;
  }

  if (node.children?.length || typeof node.value !== 'undefined') {
    return freeze(node);
  }
}

export default function inQuery(obj, version = 0) {
  return makeNode(obj, ROOT_KEY, version).children;
}
