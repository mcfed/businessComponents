import React from 'react';
import {shallow, ShallowRendererProps} from 'enzyme';
import {HashRouter} from 'react-router-dom';
import {renderHook} from '@testing-library/react-hooks';
import ModalOrView, {useHandleCancel, ModalOrViewProps} from '../index';

describe('useHandleCancel', () => {
  it('有onCancel', () => {
    const onCancel = jest.fn();
    const {result} = renderHook(() =>
      useHandleCancel({
        onCancel
      })
    );
    const event = {
      test: 'test'
    };
    result.current(event as any);
    expect(onCancel).toHaveBeenCalledWith(event);
  });

  it('无onCancel', () => {
    const goBack = jest.fn();
    const {result} = renderHook(
      () =>
        useHandleCancel({
          //@ts-ignore
          history: {goBack}
        }),
      {
        wrapper: ({children}) => <HashRouter>{children}</HashRouter>
      }
    );
    const event = {};
    result.current(event as any);
    expect(goBack).toHaveBeenCalled();
  });
});

describe('ModalOrView', () => {
  function setup(props: ModalOrViewProps, options?: ShallowRendererProps) {
    const defaultProps = {};
    const wrapper = shallow<typeof ModalOrView>(
      <ModalOrView {...Object.assign({}, defaultProps, props)} />,
      options
    );
    return {
      wrapper
    };
  }

  it.skip('modal模式快照', () => {
    const {wrapper} = setup({mode: 'modal'});

    expect(wrapper).toMatchSnapshot();
  });

  it.skip('view模式快照', () => {
    const {wrapper} = setup({mode: 'view'});

    expect(wrapper).toMatchSnapshot();
  });
});
