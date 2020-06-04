import { isRange, isBranch } from '../node/index.js';
import { exParams } from './params.js';

export default function exQuery(query) {
  const result = decorateChildren(query);
  return result;
}

function decorateChildren(query) {
  const isPage = query.some((node) => isRange(node));
  if (isPage) {
    return decoratePage(query);
  } else {
    return decorateBranch(query);
  }
}

function decoratePage(query) {
  const result = [];
  for (const node of query) {
    const child = isBranch(node) ? decorateChildren(node.children) : true;
    if (isRange(node)) {
      const { key, end, count } = node;
      const paramKey = exParams(key, end, count);
      result.push(paramKey ? { _key_: paramKey, ...child } : child);
    } else {
      const { key } = node;
      result.push({ _key_: key, ...child });
    }
  }

  return result;
}

function decorateBranch(query) {
  const result = {};
  for (const node of query) {
    const child = isBranch(node) ? decorateChildren(node.children) : true;
    const { key } = node;
    result[key] = child;
  }
  return result;
}
