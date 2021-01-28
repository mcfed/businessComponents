import React from 'react';
import {Tabs} from 'antd';
import {TabsProps, TabPaneProps} from 'antd/lib/tabs';

interface MyTabProps extends TabsProps {
  [propName: string]: any;
  name: string;
}

export default class MyTabs extends React.Component<MyTabProps, any> {
  static TabPane: any;
  render() {
    return <Tabs {...this.props} />;
  }
}
