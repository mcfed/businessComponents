import React from 'react';
import {storiesOf} from '@storybook/react';
import {Button} from 'antd';
// import PropertiesPanel from './properties-panel';
import {diagramXML} from '../sources/xml';
import McBpmn from '../index';

const stories = storiesOf('Bpmn', module);

stories.add('基础使用', () => {
  class App extends React.Component {
    state = {
      readonly: false,
      xmlData: null,
      bpmnData: [
        {
          id: 'Activity_0irvtx6',
          runState: 1
        },
        {
          id: 'Activity_1hqlmun',
          runState: 2
        }
      ]
    };

    componentDidMount() {}
    initPanel(bpmnModeler, container) {
      // const propertiesPanel = new PropertiesPanel({
      //   container,
      //   modeler: bpmnModeler
      // });
    }
    // 获取XML
    getXml() {
      const {bpmnModeler} = this.state;
      bpmnModeler.saveXML({format: true}, (err, data) => {
        alert(data);
      });
    }
    // 导入xml
    setXml() {
      this.setState({
        xmlData: diagramXML
      });
    }
    getBpmn(bpmnModeler) {
      this.setState(
        {
          bpmnModeler
        },
        () => {
          this.setColor();
        }
      );
    }
    setColor() {
      const {bpmnModeler, bpmnData} = this.state;
      // Viewer 模式
      const canvas = bpmnModeler.get('canvas');
      // 获取到全部节点
      const allShapes = bpmnModeler.get('elementRegistry').getAll();
      // bpmnData 后台返回节点数据
      //循环节点添加颜色
      allShapes.forEach(element => {
        // const shapeAttrs = element.businessObject.$attrs;
        const shapeId = element.businessObject.id;
        bpmnData.map(item => {
          if (shapeId === item.id) {
            let elementType = element.businessObject.$type;
            if (elementType != 'bpmn:Group') {
              if (elementType == 'bpmn:SequenceFlow') {
                canvas.addMarker(shapeId, 'highlight-line-' + item.runState);
              } else {
                canvas.addMarker(shapeId, 'highlight-' + item.runState);
              }
            }
          }
        });

        // add marker
        // if (element.businessObject.$type != "bpmn:Group") {
        // 	if (element.businessObject.$type == "bpmn:SequenceFlow") {
        // 		canvas.addMarker(shapeId, "highlight-line-" + shapeAttrs.runState);
        // 	} else {
        // 		canvas.addMarker(shapeId, "highlight-" + shapeAttrs.runState);
        // 	}
        // }
      });
    }
    readonlyChange() {
      const {bpmnModeler} = this.state;
      bpmnModeler.saveXML({format: true}, (err, data) => {
        this.setState({
          xmlData: data,
          readonly: !this.state.readonly
        });
      });
    }
    elementChange(xmlData) {
      // console.log(xmlData);
    }

    render() {
      const {readonly} = this.state;
      return (
        <div>
          <Button onClick={this.getXml.bind(this)}>获取xml</Button>
          <Button onClick={this.setXml.bind(this)}>导入xml</Button>
          <Button onClick={this.readonlyChange.bind(this)}>是否只读</Button>
          <McBpmn
            xmlData={diagramXML}
            initPanel={this.initPanel.bind(this)}
            elementChange={this.elementChange.bind(this)}
            getBpmn={this.getBpmn.bind(this)}
            readonly={readonly}
            width={'100%'}
            height={'100vh'}
          />
        </div>
      );
    }
  }

  return <App />;
});
