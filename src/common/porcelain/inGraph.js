import { merge } from '../ops/index.js';
import { isRange } from '../node/index.js';
import { encodeKey } from '../encode/index.js';
import { makePath } from '../path/index.js';
import { inParams } from './params.js';
export const ROOT_KEY = Symbol();

function makeNode(object, key, ver) {
  const { _key_, _ref_, _ver_, _val_, _err_, _opt_, _rng_, ...rest } =
    object || {};
  if (!key && !_key_) {
    throw Error(`inGraph.no_key ${key} ${JSON.stringify(_key_)}`);
  }
  if (key && _key_) {
    throw Error(`inGraph.key_mismatch ${key} ${JSON.stringify(_key_)}`);
  }

  // if ('_ver_' in object && ver !== _ver_) {
  //   throw Error(`graph.bad_ver ${ver} ${_ver_}`);
  // }

  const node = key === ROOT_KEY ? {} : { key: key || encodeKey(_key_) };
  node.version = ver;

  if (typeof _ref_ !== 'undefined') node.path = makePath(_ref_);
  // if (typeof _ver_ !== 'undefined') node.version = _ver_;
  if (typeof _err_ !== 'undefined') node.error = _err_;
  if (typeof _opt_ !== 'undefined') node.options = _opt_;

  if (_val_) {
    node.value = object;
  } else if (Array.isArray(object)) {
    const children = object
      .map((obj) => makeNode(obj, undefined, ver))
      .filter(Boolean)
      .sort((a, b) => (a.key <= b.key ? -1 : 1));

    if (object.bounds) {
      const { key, end } = inParams(object.bounds);
      const gaps = merge(
        [{ key, end, version: ver }],
        children.map(({ key }) => ({ key, value: 1, version: ver + 1 })),
      ).filter((node) => isRange(node));
      node.children = merge(children, gaps);
    } else if (children.length) {
      node.children = children;
    }
  } else if (object === null) {
    node.end = key;
  } else if (typeof object === 'object') {
    const children = Object.entries(rest)
      .map(([key, obj]) => makeNode(obj, key, ver))
      .filter(Boolean)
      .sort((a, b) => (a.key <= b.key ? -1 : 1));

    if (object._rng_) {
      const { key, end } = object._rng_;
      const gaps = merge(
        [{ key, end, version: ver }],
        children.map(({ key }) => ({ key, value: 1, version: ver + 1 })),
      ).filter((node) => isRange(node));
      node.children = merge(children, gaps);
    } else if (children.length) {
      node.children = children;
    }
  } else {
    node.value = object;
  }

  // TODO: Uncomment to introduce version invariant.
  // if (typeof ver === 'undefined' && node.children?.length) {
  //   const cver = node.children[0].version;
  //   if (
  //     typeof cver !== undefined &&
  //     node.children.every(({ version }) => version === cver)
  //   ) {
  //     node.childen.forEach((child) => {
  //       delete child.version;
  //     });
  //   }
  // }

  if (
    node.children?.length ||
    typeof node.end !== 'undefined' ||
    typeof node.value !== 'undefined' ||
    typeof node.path !== 'undefined' ||
    typeof node.error !== 'undefined'
  ) {
    return node;
  }
}

export default function inGraph(rootObject, version = Date.now()) {
  if (typeof rootObject === 'undefined' || rootObject === null) {
    return rootObject;
  }
  return makeNode(rootObject, ROOT_KEY, version).children;
}
