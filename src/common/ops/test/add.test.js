import { inQuery } from '../../porcelain';
import add from '../add';

test('unchanged', () => {
  const base = [];
  add(base, inQuery({ foo: 1, bar: { baz: 1 } }));
  // We need to construct base like this because add freezes returned objects

  const changed = add(base, inQuery({ foo: 1, bar: { baz: 1 } }));
  expect(changed).toBe(false);
  expect(base).toEqual(inQuery({ foo: 2, bar: { baz: 2 } }));
});

test('changed', () => {
  const base = [];
  add(base, inQuery({ foo: 1, bar: { baz: 1 } }));
  const changed = add(base, inQuery({ foo: 1, bar: { bad: 1 } }));
  expect(changed).toBe(true);
  expect(base).toEqual(inQuery({ foo: 2, bar: { baz: 1, bad: 1 } }));
});
