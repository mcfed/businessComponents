import React from 'react';
import {render, mount, shallow} from 'enzyme';
import ButtonGroups from '../index';

const Button = ButtonGroups.CustomButton;

const setup = props => {
  const wrapper = shallow(
    <ButtonGroups {...props} handleClick={jest.fn()}>
      <Button actionkey='aaa'>aaa</Button>
      <Button actionkey='bbb'>bbb</Button>
    </ButtonGroups>
  );
  return {
    wrapper
  };
};

describe.skip('ts-button-group test ', () => {
  it('cust button base test', () => {
    const wrapper = mount(
      <Button
        actionkey='aaa'
        tip='bbb'
        confirm='ccc'
        confirmTitle='ddd'
        permission={true}>
        test
      </Button>
    );

    expect(wrapper.find('.ant-btn').prop('disabled')).toEqual(undefined);
    expect(wrapper.find('.ant-btn').prop('type')).toEqual(undefined);
  });

  it('button groups base test mode buttngroups', () => {
    const wrapper = render(
      <ButtonGroups handleClick={() => {}}>
        <Button actionkey='aaaa'>aaa</Button>
        <Button actionkey='bbb'>bbb</Button>
        <Button actionkey='ccc' confirm='ccc'>
          ccc
        </Button>
        <Button actionkey='ccc' confirm='ccc' permission={false}>
          ccc
        </Button>
      </ButtonGroups>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('button groups base test mode ButtonMenu', () => {
    const wrapper = render(
      <ButtonGroups handleClick={() => {}} mode='ButtonMenu'>
        <Button actionkey='aaaa'>aaa</Button>
        <Button actionkey='bbb'>bbb</Button>
        <Button actionkey='ccc' confirm='ccc'>
          ccc
        </Button>
        <Button actionkey='ccc' confirm='ccc' permission={false}>
          ccc
        </Button>
      </ButtonGroups>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('button filter children method test', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const childArray = [
      <div permission={undefined}>1</div>,
      <div>2</div>,
      <div permission={true}>3</div>,
      <div permission={false}>4</div>
    ];
    const resultArray = [
      <div permission={undefined}>1</div>,
      <div>2</div>,
      <div permission={true}>3</div>
    ];

    expect(instance.filterChildren(childArray)).toEqual(resultArray);
  });

  it('method test formatTooltipTitle', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();

    expect(instance.formatTooltipTitle({tip: 'a', children: 'b'})).toEqual('a');
    expect(instance.formatTooltipTitle({tip: 'a'})).toEqual('a');
    expect(instance.formatTooltipTitle({children: 'b'})).toEqual('b');
  });
  it('method test renderReactElement tip1', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();

    instance.renderConfirmChild = jest.fn();
    instance.renderReactElement({props: {disabled: false, confirm: true}});
    expect(instance.renderConfirmChild).toHaveBeenCalled();
  });

  it('method test renderReactElement tip2', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();

    instance.renderNormalChild = jest.fn();
    instance.renderReactElement({props: {disabled: false, confirm: false}});
    expect(instance.renderNormalChild).toHaveBeenCalled();
  });

  it('method test renderConfirmChild ', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const renderProps = {
      props: {
        tip: 'aaa',
        confirm: 'bbb',
        actionkey: 'ccc',
        confirmTitle: 'ddd'
      }
    };

    const confirmChild = instance.renderConfirmChild(renderProps, 1);
    expect(confirmChild.props.content).toBe(renderProps.props.confirm);
    expect(confirmChild.props.title).toBe(renderProps.props.confirmTitle);
  });

  it('method test renderMenuChild', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const renderProps = {
      props: {
        tip: 'aaa'
      }
    };
    const menuChild = instance.renderMenuChild(renderProps, 1);
    expect(menuChild.props.title).toEqual(renderProps.props.tip);
    expect(menuChild.key).toEqual('1');
  });
});
