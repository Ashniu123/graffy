import inGraph from '../inGraph';
import { encodeKey } from '../../encode';
import { keyBefore, keyAfter } from '../../ops';

test('simple', () => {
  const value = ['hi'];
  Object.defineProperty(value, '_val_', { value: true });
  const users = [
    { _key_: 1, name: 'Alice', settings: value },
    { _key_: 2, name: 'Bob', manager: { _ref_: '/users/1' }, foo: null },
  ];
  users.bounds = { before: 2 };

  const posts = [];
  const tags = { _rng_: { key: '', end: '\uffff' }, a: true, b: true };
  const version = 0;

  expect(inGraph({ users, posts, tags }, version)).toEqual([
    {
      key: 'tags',
      version,
      children: [
        { key: '', end: '`\uffff', version },
        { key: 'a', value: true, version },
        { key: 'a\0', end: 'a\uffff', version },
        { key: 'b', value: true, version },
        { key: 'b\0', end: '\uffff', version },
      ],
    },
    {
      key: 'users',
      version,
      children: [
        { key: '', end: keyBefore(encodeKey(1)), version },
        {
          key: encodeKey(1),
          version,
          children: [
            { key: 'name', value: 'Alice', version },
            { key: 'settings', value: ['hi'], version },
          ],
        },
        { key: keyAfter(encodeKey(1)), end: keyBefore(encodeKey(2)), version },
        {
          key: encodeKey(2),
          version,
          children: [
            { key: 'foo', end: 'foo', version },
            { key: 'manager', path: ['users', '1'], version },
            { key: 'name', value: 'Bob', version },
          ],
        },
      ],
    },
  ]);
});
