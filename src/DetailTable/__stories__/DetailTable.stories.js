import React, {PropTypes} from 'react';
import {storiesOf} from '@storybook/react';
import {Button} from 'antd';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import {actions} from '@storybook/addon-actions';
import md from '../README.md';

import DetailTable from '../index';

const stories = storiesOf('DetailTable', module);

stories.addParameters({jest: ['DetailTable.spec.js']});

stories.add(
  '基础使用(data为json)',
  () => {
    const dataSource = {
      资产集合名称: '业务数据集合演示',
      集合类型: '敏感数据',
      资产类型: '表',
      资产目录: '敏感数据电子病历'
    };

    return (
      <DetailTable
        mode='object'
        dataSource={dataSource}
        columnNumber={3}
        title={'动态脱敏'}
      />
    );
  },
  {notes: {markdown: md}}
);

stories.add(
  '基础使用(data为array)',
  () => {
    const dataSource = [{label: 1, value: 2}];

    return <DetailTable mode='array' dataSource={dataSource} />;
  },
  {notes: {markdown: md}}
);
