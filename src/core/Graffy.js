import {
  exGraph,
  exQuery,
  unwrapPorcelain,
  inGraph,
  makePath,
  inQuery,
  finalize,
  unwrap,
  wrap,
} from '@graffy/common';
import { makeStream, mapStream } from '@graffy/stream';
import { shiftFn, shiftGen } from './shift.js';
import Core from './Core.js';

function validateArgs(first, ...args) {
  let path;
  try {
    path = makePath(first);
  } catch {
    args.unshift(first);
    path = [];
  }

  for (const arg of args) {
    if (
      typeof arg !== 'undefined' &&
      typeof arg !== 'object' &&
      typeof arg !== 'function'
    ) {
      throw Error('validateArgs.invalid_argument ' + JSON.stringify(arg));
    }
  }

  return [path, ...args];
}

export default class Graffy {
  constructor(path = [], core = new Core()) {
    this.core = core;
    this.path = path;
  }

  on(type, ...args) {
    const [rawPath, rawHandler] = validateArgs(...args);
    const path = this.path.concat(rawPath);
    const handler = path.length
      ? (type === 'watch' ? shiftGen : shiftFn)(rawHandler, path)
      : rawHandler;

    this.core.on(type, path, handler);
  }

  onRead(...args) {
    const [path, handle] = validateArgs(...args);
    this.on('read', path, async function porcelainRead(query, options) {
      return finalize(
        inGraph(await handle(exQuery(query), options)),
        query,
      );
    });
  }

  onWatch(...args) {
    const [path, handle] = validateArgs(...args);
    this.on('watch', path, function porcelainWatch(query, options) {
      return makeStream((push, end) => {
        const subscription = handle(exQuery(query), options);
        (async function () {
          try {
            let firstValue = (await subscription.next()).value;
            push(firstValue && finalize(inGraph(firstValue), query));
            for await (const value of subscription) {
              push(value && inGraph(value));
            }
          } catch (e) {
            end(e);
          }
        })();
        return () => subscription.return();
      });
    });
  }

  onWrite(...args) {
    const [path, handle] = validateArgs(...args);
    this.on('write', path, async function porcelainWrite(change, options) {
      return inGraph(await handle(exGraph(change), options));
    });
  }

  use(...args) {
    const [path, provider] = validateArgs(...args);
    provider(new Graffy(path, this.core));
  }

  call(type, unwrappedPayload, options) {
    const payload = wrap(unwrappedPayload, this.path);
    const result = this.core.call(type, payload, options);
    const unwrapResult = (value) => {
      return value && unwrap(value, this.path);
    };

    if (!this.path.length) return result;

    return type === 'watch'
      ? mapStream(result, unwrapResult)
      : result.then(unwrapResult);
  }

  async read(...args) {
    const [path, porcelainQuery, options] = validateArgs(...args);
    const query = wrap(inQuery(porcelainQuery), path);
    const result = await this.call('read', query, options || {});
    return unwrapPorcelain(exGraph(result), path);
  }

  watch(...args) {
    const [path, porcelainQuery, options] = validateArgs(...args);
    const query = wrap(inQuery(porcelainQuery), path);
    const stream = this.call('watch', query, options || {});
    return mapStream(stream, (value) => unwrapPorcelain(exGraph(value), path));
  }

  async write(...args) {
    const [path, porcelainChange, options] = validateArgs(...args);
    const change = wrap(inGraph(porcelainChange), path);
    const writtenChange = await this.call('write', change, options || {});
    return unwrapPorcelain(exGraph(writtenChange), path);
  }
}
