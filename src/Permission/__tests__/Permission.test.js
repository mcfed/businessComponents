import React from 'react';
import Permission from '../Permission';
import {shallow, mount, render} from 'enzyme';

it('Permission component', () => {
  const tree = shallow(
    <Permission expression={true}>
      <span>has</span>
    </Permission>
  );
  expect(tree.contains(<span>has</span>)).toEqual(true);
  expect(tree).toMatchSnapshot();
});

it('Permission component is empty', () => {
  const tree = shallow(
    <Permission expression={false}>
      <span>has</span>
    </Permission>
  );
  expect(tree.contains(<span>has</span>)).toEqual(false);
  expect(tree).toMatchSnapshot();
});
