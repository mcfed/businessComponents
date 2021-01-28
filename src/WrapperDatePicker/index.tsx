import React from 'react';
import moment, {Moment} from 'moment';

//format:'YYYY-MM-DD HH:mm:ss'
//value:any
// defaultTrggier?:'onChange'
//timeRange?:false
//timeRangeType?:'day'

interface WrapperDatePickerProps {
  /**
   * 包裹的子组件
   */
  children: React.ReactElement;
  /**
   * 日期内容变化时的回调
   */
  onChange?: any;
  /**
   * 当前时间
   */
  value?: any;
  /**
   * 组件传出的时间格式
   */
  valueFormat?: string;
  /**
   * 是否使用 moment 初始化时间
   */
  isInitMoment?: boolean;
  /**
   * 展示的时间格式
   */
  format: string;
  /**
   * 设置默认回调方法
   */
  defaultTrggier?: string;
  /**
   * 以什么时间单位作为开始和结束类型（默认为天）  -day -month -year
   */
  timeRange?: boolean;
  /**
   * 设置时间范围单位
   */
  timeRangeType?: string;
}
interface wrapperDatePickerState {
  value: any;
  valueFormatFinal: string;
}

export default class WrapperDatePicker extends React.Component<
  WrapperDatePickerProps,
  wrapperDatePickerState
> {
  static defaultProps = {
    defaultTrggier: 'onChange',
    timeRange: false,
    isInitMoment: true,
    timeRangeType: 'day'
  };
  constructor(props: WrapperDatePickerProps) {
    super(props);
    this.state = {
      value: this.valueInit(props),
      valueFormatFinal: this.translateValueFormat(props)
    };
  }
  static getDerivedStateFromProps(
    nextprops: WrapperDatePickerProps,
    prevstate: wrapperDatePickerState
  ) {
    // console.log(nextprops, prevstate);
  }
  // componentDidUpdate(prevProps:WrapperDatePickerProps) {
  //   if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
  //     this.setState({
  //       value: this.valueInit(this.props),
  //       valueFormatFinal: this.translateValueFormat(this.props)
  //     });
  //   }
  // }
  translateValueFormat(props: WrapperDatePickerProps) {
    return props.valueFormat !== undefined ? props.valueFormat : props.format;
  }
  valueInit(props: WrapperDatePickerProps) {
    const {value, format} = props;
    return this.isValueArray(value)
      ? this.array2value(value)
      : this.single2value(value, format);
  }

  array2value(arrayValue: any[]) {
    const {format} = this.props;
    if (arrayValue.length === 0) {
      return undefined;
    }
    return [
      this.single2value(arrayValue[0], format),
      this.single2value(arrayValue[1], format)
    ];
  }
  single2value(singleValue: any, format: string) {
    const {isInitMoment} = this.props;
    if (singleValue === undefined || singleValue === '') {
      return undefined;
    }
    return isInitMoment
      ? moment(moment(singleValue).format(format))
      : moment(singleValue).format(format);
  }
  private isValueTimestamp(valueFormat: string) {
    return valueFormat.toLocaleLowerCase() === 'x';
  }
  private isValueArray(value: any) {
    return value instanceof Array;
  }

  private formatOnchangeArrayVal(date: any[]) {
    const {onChange, timeRange, timeRangeType} = this.props;
    const {valueFormatFinal} = this.state;
    if (date.length === 0) {
      //清空时
      onChange(date);
      return false;
    }
    let onChangeVal = timeRange
      ? [
          date[0].startOf(timeRangeType).format(valueFormatFinal),
          date[1].endOf(timeRangeType).format(valueFormatFinal)
        ]
      : [date[0].format(valueFormatFinal), date[1].format(valueFormatFinal)];
    if (this.isValueTimestamp(valueFormatFinal)) {
      onChangeVal = onChangeVal.map(it => Number(it));
    }
    onChange(onChangeVal);
  }
  formatOnchangeSingleVal(date: any) {
    const {onChange} = this.props;
    const {valueFormatFinal} = this.state;
    if (date === null) {
      //清空时
      onChange(undefined);
      return false;
    }
    let onChangeVal = moment(date).format(valueFormatFinal);
    this.isValueTimestamp(valueFormatFinal)
      ? onChange(Number(onChangeVal))
      : onChange(onChangeVal);
  }
  onChange(date: any, dateString: string) {
    //返回的date有可能是null  moment(null) 为Invalid date
    this.setState(
      {
        value: date
      },
      () => {
        if (this.isValueArray(date)) {
          this.formatOnchangeArrayVal(date);
        } else {
          this.formatOnchangeSingleVal(date);
        }
      }
    );
  }
  render() {
    const {
      children,
      valueFormat,
      defaultTrggier,
      timeRange,
      timeRangeType
    } = this.props;
    const {value} = this.state;
    return React.cloneElement(children, {
      value: value,
      //@ts-ignore
      [defaultTrggier]: this.onChange.bind(this)
    });
  }
}
