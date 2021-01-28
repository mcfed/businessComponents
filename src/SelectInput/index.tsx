import React, {Component, PureComponent, ReactNode} from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';

interface SearchInputProps extends SelectProps {
  afterAddon?: ReactNode;
}

class SearchInput extends PureComponent<SearchInputProps> {
  render() {
    const {afterAddon, children, ...otherProps} = this.props;
    return (
      <div className='ant-input-group-wrapper ant-select-group-wrapper'>
        <div className='ant-input-wrapper ant-input-group ant-select-group'>
          <Select showSearch {...otherProps}>
            {children}
          </Select>
          <div className='ant-input-group-addon'>{afterAddon}</div>
        </div>
      </div>
    );
  }
}

const favSearchInput = React.createRef();

interface FavSearchInputProp extends SearchInputProps {
  afterAddon?: ReactNode;
  // onChange:Function
}

interface FavSearchInputState {
  // value: string | number | LabeledValue;
  options: Array<any>;
}

export class FavSearchInput extends Component<
  FavSearchInputProp,
  FavSearchInputState
> {
  myRef: React.RefObject<SearchInput>;
  state!: FavSearchInputState;
  constructor(props: any) {
    super(props);
    this.state = {
      // value: '',
      options: props.options
    };
    this.myRef = React.createRef();
  }

  handlerSearch(value: any) {
    const {onChange} = this.props;
    //@ts-ignore
    onChange(value);
    // console.log(value)
    // // if (value !== '') {
    //   this.setState(
    //     {
    //       value: value
    //     },
    //     function() {
    //       //@ts-ignore

    //     }
    //   );
    // // }
  }
  render() {
    // const {} = this.state;
    const {children, value, ...otherProps} = this.props;
    return (
      <SearchInput
        ref={this.myRef}
        {...otherProps}
        filterOption={false}
        defaultActiveFirstOption={false}
        onSearch={value => this.handlerSearch(value)}
        onSelect={value => this.handlerSearch(value)}
        onBlur={value => this.handlerSearch(value)}
        allowClear={true}
        value={value}
        //@ts-ignore
        getPopupContainer={(target: HTMLElement) => target.parentNode}>
        {children}
      </SearchInput>
    );
  }
}

export default SearchInput;
