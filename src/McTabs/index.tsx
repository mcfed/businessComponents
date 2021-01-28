import React from 'react';
import MyTabs from './tabs';
const {TabPane} = MyTabs;

interface MyStepsProps {
  /**
    默认选中tab 配置，非必须
    **/
  defaultActiveKey?: string;
  /**
    tab切换方法 配置，非必须
    **/
  onChange: (key: string) => void;
  /**
    tab数据 配置，必须
    **/
  tabsData: any[];
  /**
    校验通过方法 配置，非必须
    **/
  handleSubmit: (values: object) => void;
}

interface State {
  activeTabIndex: string;
}

export default class MySteps extends React.Component<MyStepsProps, State> {
  myRef: {ref: any; disabled: boolean}[] = [];
  static defaultProps = {
    steps: []
  };

  componentWillMount() {
    this.state = {
      activeTabIndex: ''
    };
    this.setActiveKey();
  }

  setActiveKey() {
    // 如果设置的defaultActiveKey状态为disabled或者没设置defaultActiveKey，则展示第一个非disabled的tab.
    const {tabsData} = this.props;
    const {activeTabIndex} = this.state;
    let currentTab = tabsData.filter(item => item.name === activeTabIndex);
    let currentStatus = currentTab[0] && currentTab[0].disabled;
    let key = activeTabIndex;
    let firstActiveKey = tabsData.filter(item => !item.disabled)[0].name;
    if (activeTabIndex) {
      if (currentStatus) {
        key = firstActiveKey;
      }
    } else {
      key = firstActiveKey;
    }

    this.setState({
      activeTabIndex: key
    });
  }
  onChange = (key: string) => {
    this.setState({
      activeTabIndex: key
    });
    this.props.onChange && this.props.onChange(key);
  };
  handleSubmit() {
    let errors: any[] = [];
    let values = {};
    this.myRef.forEach((obj: any) => {
      let item = obj.ref;
      let form = item.current && item.current.form;
      form &&
        !obj.disabled &&
        form.validateFieldsAndScroll(
          {
            force: true
          },
          (error: any, value: object) => {
            if (error) {
              errors.push({
                tab: item.current.form.props.name,
                error: error
              });
            } else {
              Object.assign(values, {[item.current.form.props.name]: value});
            }
          }
        );
    });
    if (errors.length > 0) {
      this.setState({
        activeTabIndex: errors[0] && errors[0].tab
      });
      return;
    }
    this.props.handleSubmit && this.props.handleSubmit(values);
  }
  getTabPane(
    item: {text: string; name: string; disabled: boolean; component: any},
    others: object
  ) {
    let ref = React.createRef();
    const {text, name, disabled, component} = item;
    this.myRef.push({ref: ref, disabled: disabled});
    return (
      <TabPane tab={text} key={name} forceRender disabled={disabled}>
        {!disabled &&
          !!component &&
          React.createElement(component, {...others, ref: ref})}
      </TabPane>
    );
  }

  render() {
    const {onChange, tabsData, ...others} = this.props;
    const {activeTabIndex} = this.state;
    return (
      <MyTabs name='tab' activeKey={activeTabIndex} onChange={this.onChange}>
        {tabsData.map(item => this.getTabPane(item, others))}
      </MyTabs>
    );
  }
}
