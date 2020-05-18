import exQuery from '../exQuery';
import { key } from '../../encode';

it('exQuery', () => {
  expect(
    exQuery(
      /* prettier-ignore */
      [
        { key: 'postCount', value: 1, version: 2 },
        { key: 'posts', version: 2, children: [
          { key: key('1984'), end: '\uffff', count: 10, version: 2, children: [
            { key: 'author', version: 2, children: [
              { key: 'name', value: 1, version: 2 }
            ] },
            { key: 'body', value: 1, version: 2 },
            { key: 'title', value: 1, version: 2 },
          ] },
        ] },
        { key: 'tags', version: 2, children: [
          { key: '', end: '\uffff', count: 10, version: 2, value: 1 }
        ] }
      ],
    ),
  ).toEqual({
    postCount: true,
    posts: [
      {
        _key_: { first: 10, after: '1984' },
        title: true,
        body: true,
        author: { name: true },
      },
    ],
    tags: [{ _key_: { first: 10 } }],
  });
});
