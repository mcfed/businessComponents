import React from 'react';
import {Input} from 'antd';
import {InputProps} from 'antd/lib/input/Input';
import {SearchProps} from 'antd/lib/input/Search';
const {Search} = Input;

interface InputSearchProps extends InputProps, SearchProps {
  /**
   * 点击搜索或按下回车键时的回调
   */
  onSearch?: (arg: any) => void;
  /**
   * 输入框内容变化时的回调
   */
  onChange?: (arg: any) => void;
  /**
   * 输入框默认内容
   */
  value?: any;
}

interface InputSearchState {
  value: any;
}

export default class InputSearch extends React.Component<
  InputSearchProps,
  InputSearchState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  onSearchHandler = (value: string) => {
    const {onSearch, onChange} = this.props;
    this.setState({
      value: value
    });
    /* istanbul ignore else */
    if (onSearch) onSearch(value);
    /* istanbul ignore else */
    if (onChange) onChange(value);
  };
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value
    });
  };
  onBlur = () => {
    // const {onChange} = this.props;
    // const {value} = this.state;
    // /* istanbul ignore else */
    // if (onChange) onChange(value);
  };
  render() {
    const {value} = this.state;
    return (
      <Search
        {...this.props}
        onChange={this.onChange}
        value={value}
        onSearch={this.onSearchHandler}
        onBlur={this.onBlur}
      />
    );
  }
}
