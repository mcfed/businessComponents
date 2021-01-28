import React, {PropTypes} from 'react';
import {storiesOf} from '@storybook/react';
import {Button, Select, Input} from 'antd';
// import md from "../README.md";

import McTransfer from '../index';

const stories = storiesOf('McTransfer', module);
const Option = Select.Option;

stories.addParameters({jest: ['McTransfer.spec.js']});

stories.add('基础使用', () => {
  class SelectInput extends React.Component {
    state = {
      value1: '',
      value2: ''
    };
    selectChange = e => {
      this.setState(
        {
          value1: e
        },
        () => {
          this.props.onChange([this.state.value1, this.state.value2]);
        }
      );
    };
    inputChange = e => {
      this.setState(
        {
          value2: e.target.value
        },
        () => {
          this.props.onChange([this.state.value1, this.state.value2]);
        }
      );
    };
    renderInput() {
      return (
        <Input
          value={this.state.value2}
          onChange={this.inputChange}
          style={{width: '100%'}}
          defaultValue=''
          placeholder={this.props.placeholder}
        />
      );
    }
    // renderSelect() {
    //   const {schemaData, dataSource, locale, placeholder} = this.props;
    //   return (
    //     <InputGroup compact>
    //       {
    //         <Select
    //           value={this.state.value1}
    //           style={{width: '40%'}}
    //           defaultValue={dataSource[0] && dataSource[0].schemaName}
    //           onChange={this.selectChange}>
    //           <Option value='' key=''>
    //             {locale('GLOBAL.ALL')}
    //           </Option>
    //           {schemaData.map(v => (
    //             <Option value={v.text} key={v.text}>
    //               {v.text}
    //             </Option>
    //           ))}
    //         </Select>
    //       }
    //       <Input
    //         value={this.state.value2}
    //         onChange={this.inputChange}
    //         style={{width: '60%'}}
    //         defaultValue=''
    //         placeholder={placeholder}
    //       />
    //     </InputGroup>
    //   );
    // }
    render() {
      // const {addType} = this.props;
      // return addType === 'schema' ? this.renderInput() : this.renderSelect();
      return this.renderInput();
    }
  }

  class App extends React.Component {
    state = {
      mockData: [],
      targetKeys: [],
      selectedKeys: [],
      header: [
        {
          dataIndex: 'title',
          text: '列'
        },
        {
          dataIndex: 'description',
          text: '类型'
        },
        {
          dataIndex: 'name',
          text: '业务类型'
        }
      ],
      searchItem: 'title',
      listStyle: {
        width: 500,
        height: 400
      },
      leftStyle: {
        width: 300,
        height: 400
      }
    };

    componentDidMount() {
      this.getMock();
    }

    getMock = () => {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < 2000; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          name: this.getName(`name${i + 1}`, i),
          disabled: i === 3 ? true : false,
          chosen: Math.random() * 2 > 1
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.setState({mockData, targetKeys});
    };

    getName = (name, id) => {
      // name 传入应是数组
      return (
        <Select
          onChange={this.changeName}
          defaultValue='1'
          size='small'
          style={{width: '120px'}}>
          <Option value='1' key={id}>
            {name}
          </Option>
          <Option value='2' key={id}>
            {name}
          </Option>
          <Option value='3' key={id}>
            {name}
          </Option>
          <Option value='4' key={id}>
            {name}
          </Option>
        </Select>
      );
    };

    changeName(value, selectRow) {
      console.log(selectRow);
      console.log(value);
    }

    filterOption = (inputValue, option) => {
      return inputValue[1].trim() === ''
        ? true
        : option.title.indexOf(inputValue[1]) > -1;
    };

    handleChange(nextTargetKeys, newTargetData, _direction, _moveKeys) {
      this.setState({targetKeys: nextTargetKeys});
      console.log(nextTargetKeys);
      // console.log(newTargetData) // 数据量多时会卡
    }

    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.setState({
        selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
      });
    }

    render() {
      const {selectedKeys, targetKeys} = this.state;
      return (
        <McTransfer
          dataSource={this.state.mockData} // 数据
          mode='table' // 模式为table时，右侧列表展现为table。nomal或者不指定则展现为正常transfer模式
          searchRender={<SelectInput />} //自定义搜索
          rowKey={record => record.key} // key
          render={item => item.title} // 展示的数据
          header={this.state.header} // table模式下的table header
          targetKeys={targetKeys} // 选中项
          selectedKeys={selectedKeys} // 可选项
          onSelectChange={this.handleSelectChange.bind(this)} // 有checkbox 状态改变时触发
          filterOption={this.filterOption.bind(this)} // 搜索方法
          onChange={this.handleChange.bind(this)} // 左右数据发生变化时触发
          // className={'test'} // className
          // rowHeight={40} // row行高，默认32
          listStyle={{
            width: 800,
            height: 400
          }} // 左右list统一样式
          leftStyle={{
            width: 200,
            height: 400
          }} // 单个样式，可覆盖listStyle
          showSearch //指定了showSearch，则hide单个都不生效，全部显示
          // hideLeftSearch={true} // 隐藏搜索栏
          // hideRightSearch={true} // 隐藏搜索栏
          titles={['可选敏感列', '已选敏感列']} // 左右标题
          locale={{
            itemUnit: '项',
            itemsUnit: '项',
            notFoundContent: '无数据',
            searchPlaceholder: '请输入'
          }} // 其他配置
        />
      );
    }
  }

  return <App />;
});
