import React from 'react';

/**
 * placeholder：input提示语，非必须
 * value: 初始值，非必须
 * prefixCls：className 前缀，非必须
 * onChange：change事件，非必须
 * handleClear：clear事件，非必须
 * searchRender：render方法，必须
 */
interface SearchProps {
  placeholder?: string;
  value?: string;
  prefixCls?: string;
  onChange(e: string): void;
  handleClear: () => void;
  searchRender: any;
}

const initialState = {};

type State = typeof initialState;

export default class Search extends React.Component<SearchProps, State> {
  static defaultprops = {
    placeholder: ''
  };
  handleChange = (e: string) => {
    const onChange = this.props.onChange;
    /* istanbul ignore else */
    if (onChange) {
      onChange(e);
    }
  };

  render() {
    const {placeholder, value, prefixCls, searchRender} = this.props;

    return (
      <div className={`${prefixCls}-wapper`}>
        {React.cloneElement(searchRender, {
          placeholder: placeholder,
          className: prefixCls,
          value: value,
          onChange: this.handleChange
        })}
      </div>
    );
  }
}
