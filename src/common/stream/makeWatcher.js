import { makeStream } from '@graffy/stream';

export default function makeWatcher() {
  const listeners = new Set();

  function write(change) {
    for (const push of listeners) push(change);
  }

  function watch(...args) {
    return makeStream((push, _end) => {
      listeners.add(push);
      if (args.length) Promise.resolve(args[0]).then(push);
      return () => listeners.delete(push);
    });
  }

  return { write, watch };
}
