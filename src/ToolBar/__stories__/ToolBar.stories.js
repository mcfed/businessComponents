import React from 'react';
import {message} from 'antd';
import {storiesOf} from '@storybook/react';
import ToolBar from '../index';
import CustomButton from '../../ButtonGroups/Button';
import ButtonGroups from '../../ButtonGroups';
const stories = storiesOf('ToolBar', module);

stories.add('基础用法', () => {
  const handlerMenu = function(actionkey) {
    if (actionkey === 'click1') {
      message.info('你点击了第一个按钮');
    }
    if (actionkey === 'click2') {
      message.info('你终究还是点了');
    }
    if (actionkey === 'click3') {
      message.info('这是第三个按钮');
    }
    if (actionkey === 'click4') {
      message.info('没有更多了');
    }
  };
  return (
    <div>
      <ToolBar className='user-tool-bar'>
        <ButtonGroups handleClick={handlerMenu}>
          <CustomButton actionkey='click1' confirm='这是一个无理取闹的确认框'>
            点击
          </CustomButton>
          <CustomButton actionkey='click2'>不要点我</CustomButton>
          <CustomButton actionkey='click3'>第三个按钮</CustomButton>
          <CustomButton actionkey='click4'>444</CustomButton>
        </ButtonGroups>
      </ToolBar>
    </div>
  );
});
