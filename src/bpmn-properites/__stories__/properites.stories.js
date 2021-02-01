import React from 'react';
import {storiesOf} from '@storybook/react';
import {Properites} from '../properites';
import {SimpleProperite} from '../SimpleProperites';

const stories = storiesOf('bpmn-properites', module);

stories.add('基础使用', () => {
  return (
    <Properites title='属性面板'>
      <SimpleProperite></SimpleProperite>
    </Properites>
  );
});

stories.add('基础使用带初始化值', () => {
  const values = {
    node: {
      name: 'node',
      value: 'abc'
    },
    type: {
      name: 'type',
      value: '0'
    },
    user: {
      name: 'user',
      value: '1'
    }
  };
  return (
    <Properites
      title='属性面板'
      values={values}
      onChange={function(values) {
        console.log(values);
      }}>
      <SimpleProperite></SimpleProperite>
    </Properites>
  );
});
