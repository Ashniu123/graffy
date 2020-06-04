import { encodeKey, decodeKey } from '../encode/index.js';
import { keyStep, keyAfter, keyBefore } from '../ops/index.js';

function empty(object) {
  for (const _ in object) return false;
  return true;
}

export function inParams({
  before,
  after,
  first,
  last,
  excludeBefore,
  excludeAfter,
  ...params
}) {
  const node = {};
  const prefix = empty(params) ? '' : encodeKey(params) + '.';
  if (first || last) node.count = first || -last;

  const key = typeof after !== 'undefined' ? encodeKey(after) : '';
  const end = typeof before !== 'undefined' ? encodeKey(before) : '\uffff';
  node.key = prefix + (excludeAfter ? keyAfter(key) : key);
  node.end = prefix + (excludeBefore ? keyBefore(end) : end);

  return node;
}

export function exParams(key, end, count) {
  let page = {};
  if (count) page[count > 0 ? 'first' : 'last'] = count;

  const keyParts = key.split('.');
  const endParts = end.split('.');

  if (keyParts.length === 2) {
    if (endParts.length !== 2 || endParts[0] !== keyParts[0]) {
      throw Error('exParams.prefix_mismatch');
    }

    const params = decodeKey(keyParts[0]);
    page = { ...page, ...params };

    key = keyParts[1];
    end = keyParts[1];
  }

  if (key !== '') {
    const { key: k, step } = keyStep(key);
    page.after = decodeKey(k);
    if (step === 1) page.excludeAfter = true;
  }
  if (end !== '\uffff') {
    const { key: k, step } = keyStep(end);
    page.before = decodeKey(k);
    if (step === -1) page.excludeBefore = true;
  }
  if (!empty(page)) return page;
}
