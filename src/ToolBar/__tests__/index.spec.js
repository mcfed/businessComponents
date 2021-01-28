import React from 'react';
import {render} from 'enzyme';
import {Button} from 'antd';
import ToolBar from '../index';

describe('toolbar base test', () => {
  it('test render', () => {
    const wrapper = render(
      <ToolBar>
        <Button>1</Button>
        <Button>2</Button>
      </ToolBar>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
