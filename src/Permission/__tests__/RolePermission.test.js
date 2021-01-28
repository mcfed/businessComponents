'use strict';

import React from 'react';
import RolePermission from '../RolePermission';
import {shallow, mount, render} from 'enzyme';
import toJson from 'enzyme-to-json';

it.skip('RolePermission component', () => {
  const tree = render(
    <RolePermission roleName='admin'>
      <span>has</span>
    </RolePermission>
  );
  expect(toJson(tree)).toMatchSnapshot();
  // const tree = function(){
  //   throw new TypeError('RolePermission not has context appConfig props');
  // }
  //  console.dir(expect(tree))
  // console.log(tree)
  //expect(tree).toThrow("RolePermission not has context appConfig props")
  //  expect(tree).toMatchSnapshot();
});

function setup(props, context) {
  const wrapper = shallow(
    <RolePermission {...props}>
      <span>123</span>
    </RolePermission>,
    {context}
  );
  return {
    wrapper,
    props
  };
}

describe('rolePermission test', () => {
  it('appConfig == undefined ', () => {
    const {wrapper} = setup(
      {},
      {
        appConfig: undefined
      }
    );
    expect(wrapper.contains(<span>123</span>)).toEqual(false);
  });

  it('appConfig != undefined roleName === appConfig.auth.authRole', () => {
    const {wrapper} = setup(
      {roleName: 'aa'},
      {
        appConfig: {
          auth: {
            authRole: 'aa'
          }
        }
      }
    );

    expect(wrapper.contains(<span>123</span>)).toEqual(true);
  });

  it('appConfig != undefined roleName !== appConfig.auth.authRole', () => {
    const {wrapper} = setup(
      {roleName: 'aa'},
      {
        appConfig: {
          auth: {
            authRole: 'aa1'
          }
        }
      }
    );

    expect(wrapper.contains(<span>123</span>)).toEqual(false);
  });
});
