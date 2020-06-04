import sieve from '../sieve.js';
import { inGraph } from '../../porcelain/index.js';

test('empty', () => {
  const g = [];
  const change = sieve(g, inGraph({ foo: 42 }, 0));
  expect(change).toEqual([]);
  expect(g).toEqual([]);
});

test('full', () => {
  const g = [{ key: '', end: '\uffff', version: 0 }];
  const change = sieve(g, inGraph({ foo: 42 }, 0));
  expect(change).toEqual(inGraph({ foo: 42 }, 0));
  expect(g).toEqual([
    { key: '', end: 'fon\uffff', version: 0 },
    { key: 'foo', value: 42, version: 0 },
    { key: 'foo\0', end: '\uffff', version: 0 },
  ]);
});

test('full-add-branch', () => {
  const g = [{ key: '', end: '\uffff', version: 0 }];
  const change = sieve(g, inGraph({ foo: { bar: 42 } }, 0));
  expect(change).toEqual(inGraph({ foo: { bar: 42 } }, 0));
  expect(g).toEqual([
    { key: '', end: 'fon\uffff', version: 0 },
    {
      key: 'foo',
      version: 0,
      children: [
        { key: '', end: 'baq\uffff', version: 0 },
        { key: 'bar', value: 42, version: 0 },
        { key: 'bar\0', end: '\uffff', version: 0 },
      ],
    },
    { key: 'foo\0', end: '\uffff', version: 0 },
  ]);
});

test('ignore-unchanged', () => {
  const g = inGraph({ foo: { bar: 42 } }, 0);
  const change = sieve(g, inGraph({ foo: { bar: 42 } }, 1));
  expect(change).toEqual([]);
  expect(g).toEqual(inGraph({ foo: { bar: 42 } }, 1));
});
