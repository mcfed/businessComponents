import {Select, Input} from 'antd';
import React, {Component} from 'react';
import './PropertiesView.css';
const Option = Select.Option;

export default class PropertiesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedElements: [],
      element: null
    };
  }

  componentDidMount() {
    const {modeler} = this.props;

    modeler.on('selection.changed', e => {
      this.setState({
        selectedElements: e.newSelection,
        element: e.newSelection[0]
      });
    });

    modeler.on('element.changed', e => {
      //监听节点
      const {element} = e;
      const {element: currentElement} = this.state;
      if (!currentElement) {
        return;
      }
      // update panel, if currently selected element changed
      if (element.id === currentElement.id) {
        this.setState({
          element
        });
      }
    });
  }
  onChange(changeObj) {
    const {onChange, modeler} = this.props;
    const {element} = this.state;
    onChange && onChange(changeObj, modeler, element);
  }
  render() {
    const {modeler} = this.props;
    const {selectedElements, element} = this.state;
    return (
      <div>
        {selectedElements.length === 1 && (
          <ElementProperties
            onChange={this.onChange.bind(this)}
            modeler={modeler}
            element={element}
          />
        )}

        {selectedElements.length === 0 && <span>请选择一个元素.</span>}
      </div>
    );
  }
}

function ElementProperties(props) {
  let {element, onChange} = props;
  let elementType = element.businessObject.$type;
  function CommonChange(value, name) {
    const changeObj = {
      [name]: value
    };
    onChange && onChange(changeObj);
  }
  let isHeader =
    elementType === 'bpmn:SequenceFlow' ||
    elementType === 'bpmn:StartEvent' ||
    elementType === 'bpmn:EndEvent' ||
    elementType === 'bpmn:ExclusiveGateway';
  return (
    <div className='element-properties' key={element.id}>
      {!isHeader ? (
        <div>
          <fieldset>
            <label>id</label>
            <span>{element.id}</span>
          </fieldset>

          <fieldset>
            <label>处理人</label>
            <Input
              style={{width: 120}}
              value={element.businessObject.get('handler') || ''}
              onChange={event => CommonChange(event.target.value, 'handler')}
            />
          </fieldset>
          <fieldset>
            <label>审批类型</label>
            <Select
              value={element.businessObject.get('approvalType') || ''}
              onChange={event => CommonChange(event, 'approvalType')}
              style={{width: 120}}>
              <Option key={1} value={'1'}>
                或签
              </Option>
              <Option key={2} value={'2'}>
                会签
              </Option>
            </Select>
          </fieldset>
        </div>
      ) : null}
    </div>
  );
}
