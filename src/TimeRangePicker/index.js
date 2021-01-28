import React, {Component} from 'react';
import {TimePicker, Input} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

const InputGroup = Input.Group;

export default class TimeRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.translateTime(props.value)};
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props.value,nextProps.value,JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value))
    if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
      this.setState({...this.translateTime(nextProps.value)});
    }
  }
  translateTime(val) {
    const {format} = this.props;
    return {
      startTime: val && val[0] ? moment(val[0], [format]) : '',
      endTime: val && val[1] ? moment(val[1], [format]) : ''
    };
  }
  hanldeChange(type, val) {
    let {onChange} = this.props;
    val = val ? val : '';
    // console.log(type)

    if (type === 'start') {
      this.setState(
        {
          startTime: val
        },
        () => {
          onChange([
            this.formatTime(this.state.startTime),
            this.formatTime(this.state.endTime)
          ]);
        }
      );
    } else if (type === 'end') {
      this.setState(
        {
          endTime: val
        },
        () => {
          onChange([
            this.formatTime(this.state.startTime),
            this.formatTime(this.state.endTime)
          ]);
        }
      );
    }
  }

  formatTime(momentTime) {
    let {format} = this.props;
    return momentTime ? moment(momentTime, [format]).format(format) : '';
  }

  render() {
    let {value, onChange, id, label, format, ...otherProps} = this.props;
    let {startTime, endTime} = this.state;
    return (
      <InputGroup compact className='TimeRangePicker-compact'>
        <TimePicker
          {...otherProps}
          onChange={this.hanldeChange.bind(this, 'start')}
          value={startTime}
        />
        <TimePicker
          {...otherProps}
          onChange={this.hanldeChange.bind(this, 'end')}
          value={endTime}
        />
      </InputGroup>
    );
  }
}

TimeRangePicker.propTypes = {
  /**
   * format 时间格式
   */
  paramName: PropTypes.string
};

TimeRangePicker.defaultProps = {
  format: 'HH:mm:ss'
};
