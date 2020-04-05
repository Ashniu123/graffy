import { merge, slice, sieve, add, finalize } from '@graffy/common';
import { makeStream } from '@graffy/stream';

export default function subscribe(store, originalQuery, raw) {
  const empty = () => finalize([], originalQuery, 0);
  let push, end;
  let upstream;
  let query = [];
  let data = empty();
  let payload = [];

  resubscribe(originalQuery);

  return makeStream((streamPush, streamEnd) => {
    push = v => {
      // console.log('Push', debug(v));
      streamPush(v);
    };
    end = streamEnd;
    return unsubscribe;
  });

  async function resubscribe(unknown, _extraneous) {
    try {
      const changed = add(query, unknown);
      // console.log('Resubscribe');
      if (!changed) return;

      if (upstream) upstream.return(); // Close the existing stream.
      upstream = store.call('watch', query, { skipFill: true });

      let { value } = await upstream.next();
      // console.log('Got first subscription value', value && debug(value));

      if (typeof value === 'undefined') {
        // The upstream is a change subscription, not a live query,
        // so we need to fetch the initial value.

        // TODO: Get a version corresponding to the subscription's start
        // and verify that the store.read response is newer.

        value = await store.call('read', unknown, { skipCache: true });
      }
      value = value && slice(value, unknown).known;
      putValue(value, false);
    } catch (e) {
      error(e);
    }
    putStream(upstream);
  }

  async function putStream(stream) {
    // TODO: Backpressure: pause pulling if downstream listener is saturated.
    // console.log('Before sinking stream', debug(data));
    try {
      for await (const value of stream) putValue(value, true);
    } catch (e) {
      error(e);
    }
  }

  function putValue(value, isChange) {
    if (typeof value === 'undefined') return;
    // console.log('Fill/subscribe: PutValue', debug(value));

    if (value === null) {
      // No results exist at this moment.
      data = empty();
      push(null);
      return;
    }

    if (isChange) {
      // console.log('Data before sieve', debug(data), debug(value));
      const sieved = sieve(data, value);
      // console.log('Data after sieve', debug(data), debug(sieved));
      if (!sieved.length) return;
      merge(payload, sieved);
    } else {
      merge(data, value);
      // console.log('Payload before adding value', debug(payload));
      if (raw) merge(payload, value);
      // console.log('Payload after adding value');
    }

    let { known, unknown, extraneous } = slice(data, originalQuery);
    data = known || empty();

    // console.log('After slice', debug(data), unknown && debug(unknown));
    // console.log('Payload and value', debug(payload), value && debug(value));

    if (isChange && value && unknown) {
      // The sieve may have removed some necessary data (that we weren't aware
      // was necessary). Get it back.

      // console.log('Here');
      const valueParts = slice(value, unknown);
      if (valueParts.known) {
        merge(data, valueParts.known);
        if (raw) merge(payload, valueParts.known);
        unknown = valueParts.unknown;
      }
    }

    // This is not an else; previous block might update unknown.
    if (!unknown) {
      // console.log('Pushing', debug(payload));
      push(raw ? payload : data);
      payload = [];
    }

    if (unknown || extraneous) resubscribe(unknown, extraneous);
  }

  function error(e) {
    // console.error('subscribe', e);
    end(e);
    unsubscribe();
  }

  function unsubscribe() {
    if (upstream) upstream.return();
  }
}
