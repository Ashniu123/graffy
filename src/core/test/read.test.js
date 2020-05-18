import Graffy from '../Graffy';
import fill from '@graffy/fill';
import { bounded, link } from '@graffy/common';
// import { merge } from '@graffy/common';

describe('read', () => {
  let g;
  beforeEach(() => {
    g = new Graffy();
    g.use(fill());
  });

  test('simple', async () => {
    g.use('/foo', (graffy) => {
      graffy.onRead('/bar', () => Promise.resolve({ baz: 42 }));
    });
    expect(await g.read('foo', { bar: { baz: 1 } })).toEqual({
      bar: { baz: 42 },
    });
  });

  test('overlap', async () => {
    g.use('/foo', (graffy) => {
      graffy.onRead('/baz', () => Promise.resolve({ x: 15 }));
      graffy.onRead('/bar', () => Promise.resolve({ x: 42 }));
    });
    expect(await g.read({ foo: { bar: { x: 1 }, baz: { x: 1 } } })).toEqual({
      foo: { bar: { x: 42 }, baz: { x: 15 } },
    });
  });

  test('remove_null', async () => {
    g.onRead('/foo', () => ({ bar: 45, baz: null }));
    expect(await g.read({ foo: { bar: 1, baz: 1 } })).toEqual({
      foo: { bar: 45, baz: null },
    });
  });

  test.skip('empty_obj_to_null', async () => {
    // Skipping: Leaf branch mismatch now throws.
    // Should this change?
    g.onRead('/foo', () => ({ bar: 45, baz: { bad: 3 }, f: 3 }));
    expect(await g.read({ foo: { bar: 1, baz: 1 } })).toEqual({
      foo: { bar: 45 },
    });
    expect(await g.read({ foo: { bar: 1, baz: 1 } })).toEqual({
      foo: { bar: 45, baz: null },
    });
  });

  test('getKnown', async () => {
    g.use((graffy) => {
      graffy.onRead('/foo', () => Promise.resolve({ baz: 15, bar: 42 }));
    });
    expect(await g.read({ foo: { bar: 1 } })).toEqual({
      foo: { bar: 42 },
    });
  });

  describe('range-getKnown', () => {
    let provider;
    beforeEach(() => {
      provider = jest.fn(() => {
        return {
          foo: bounded([
            { _key_: 'a', baz: 15, bar: 42 },
            { _key_: 'b', baz: 16, bar: 41 },
            { _key_: 'c', baz: 17, bar: 40 },
            { _key_: 'd', baz: 18, bar: 39 },
            { _key_: 'e', baz: 19, bar: 38 },
          ]),
        };
      });
      g.onRead(provider);
    });

    test('all', async () => {
      const result = await g.read({
        foo: [{ bar: 1 }],
      });
      expect(provider).toBeCalledWith({ foo: [{ bar: true }] }, {});
      expect(result).toEqual({
        foo: [{ bar: 42 }, { bar: 41 }, { bar: 40 }, { bar: 39 }, { bar: 38 }],
      });
    });

    test('first', async () => {
      const result = await g.read({ foo: [{ _key_: { first: 2 }, bar: 1 }] });
      expect(result).toEqual({
        foo: [{ bar: 42 }, { bar: 41 }],
      });
    });
    test('last', async () => {
      const result = await g.read({ foo: [{ _key_: { last: 1 }, bar: 1 }] });
      expect(result).toEqual({ foo: [{ bar: 38 }] });
    });
    test('first-after', async () => {
      const result = await g.read({
        foo: [{ _key_: { first: 2, after: 'b' }, bar: 1 }],
      });
      expect(result).toEqual({
        foo: [{ bar: 41 }, { bar: 40 }],
      });
    });
    test('last-before', async () => {
      const result = await g.read({
        foo: [{ _key_: { last: 3, before: 'd' }, bar: 1 }],
      });
      expect(result).toEqual({
        foo: [{ bar: 41 }, { bar: 40 }, { bar: 39 }],
      });
    });
    test('first-before-after', async () => {
      const result = await g.read({
        foo: [{ _key_: { after: 'b', before: 'g', first: 2 }, bar: 1 }],
      });
      expect(result).toEqual({
        foo: [{ bar: 41 }, { bar: 40 }],
      });
    });
    test('last-before-after', async () => {
      const result = await g.read({
        foo: [{ _key_: { after: 'a', before: 'd', last: 3 }, bar: 1 }],
      });
      expect(result).toEqual({
        foo: [{ bar: 41 }, { bar: 40 }, { bar: 39 }],
      });
    });
    test('first-before-after-filled', async () => {
      const result = await g.read({
        foo: [{ _key_: { after: 'b', before: 'c', first: 4 }, bar: 1 }],
      });
      expect(result).toEqual({
        foo: [{ bar: 41 }, { bar: 40 }],
      });
    });
    test('last-before-after-filled', async () => {
      const result = await g.read({
        foo: [{ _key_: { after: 'b', before: 'd', last: 5 }, bar: 1 }],
      });
      expect(result).toEqual({
        foo: [{ bar: 41 }, { bar: 40 }, { bar: 39 }],
      });
    });

    test.skip('multi', async () => {
      const result = await g.read({
        foo: [
          { _key_: 'a', bar: 1 },
          { _key_: 'b', baz: 1 },
        ],
      });
      expect(provider).toBeCalledWith(
        {
          foo: [
            { _key_: 'a', bar: true },
            { _key_: 'b', baz: true },
          ],
        },
        {},
      );
      expect(result).toEqual({
        foo: [
          { _key_: 'a', bar: 42 },
          { _key_: 'b', baz: 16 },
        ],
      });
    });
  });

  describe('link', () => {
    beforeEach(() => {
      g.onRead('/foo', () => ({ x: link(['bar']) }));
      g.onRead('/bar', () => ({ baz: 3 }));
    });

    // test('raw', async () => {
    //   expect(await g.read({ foo: {x: { baz: 1} } })).toEqual({
    //     foo: { x: link(['bar'])},
    //     bar: { baz: 3 },
    //   });
    // });

    test('friendly', async () => {
      // Update this test after exGraph starts to remove
      // unrequested branches.
      expect(await g.read({ foo: { x: { baz: 1 } } })).toEqual({
        bar: { baz: 3 },
        foo: { x: { baz: 3 } },
      });
    });
  });
});
