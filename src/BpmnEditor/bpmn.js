import React, {PureComponent} from 'react';
import {notification} from 'antd';
import BpmnModeler from './Modeler';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import {defaultXml} from './sources/xml';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import './index.less';

class Bpmn extends PureComponent {
  state = {
    scale: 1, // 流程图比例
    svgVisible: false, // 预览图片
    svgSrc: '', // 图片地址
    bpmnModeler: null,
    readonly: false
  };
  componentDidMount() {
    const {readonly, xmlData} = this.props;
    this.setState(
      {
        readonly,
        xmlData: xmlData || defaultXml
      },
      () => {
        this.initBpmn();
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    //监听只读变化
    if (this.state.readonly !== nextProps.readonly) {
      this.setState(
        {
          readonly: nextProps.readonly,
          xmlData: nextProps.xmlData || defaultXml
        },
        () => {
          this.initBpmn();
        }
      );
    }
    const {xmlData} = this.state;
    if (nextProps.xmlData && xmlData !== nextProps.xmlData) {
      let xmlData = nextProps.xmlData || defaultXml;
      this.setState(
        {
          xmlData
        },
        () => {
          this.renderDiagram(xmlData);
        }
      );
    }
  }
  initBpmn() {
    const {readonly, xmlData} = this.state;

    // 避免缓存，每次清一下
    this.bpmnModeler && this.bpmnModeler.destroy();
    if (readonly) {
      this.bpmnModeler = new BpmnViewer({
        container: '#canvas'
      });
    } else {
      this.bpmnModeler = new BpmnModeler({
        container: '#canvas'
      });
      const $propertiesContainer = document.querySelector('#properties-panel');
      // 外部初始化属性面板
      this.props.initPanel &&
        this.props.initPanel(this.bpmnModeler, $propertiesContainer);
    }
    this.renderDiagram(xmlData);

    // 删除 bpmn logo  bpmn.io官方要求不给删或者隐藏，否则侵权
    // const bjsIoLogo = document.querySelector(".bjs-powered-by");
    // while (bjsIoLogo.firstChild) {
    // 	bjsIoLogo.removeChild(bjsIoLogo.firstChild);
    // }
  }

  // 渲染 xml 格式
  renderDiagram = xml => {
    const me = this;
    const {getBpmn, elementChange, runNodes} = me.props;
    const viewer = this.bpmnModeler;
    this.bpmnModeler.importXML(xml, (err, data) => {
      if (err) {
        notification.error({
          message: '提示',
          description: '导入失败'
        });
      } else {
        runNodes && this.mergeRunNode(runNodes);
        viewer.on('element.changed', e => {
          viewer.saveXML({format: true}, (err, data) => {
            elementChange && elementChange(data);
          });
        });
        const canvas = viewer.get('canvas');
        canvas.zoom('fit-viewport');
        getBpmn && getBpmn(viewer);
      }
    });
  };

  mergeRunNode(bpmnData) {
    const {bpmnModeler} = this;
    const canvas = bpmnModeler.get('canvas');
    const allShapes = bpmnModeler.get('elementRegistry').getAll();
    // bpmnData 后台返回节点数据
    //循环节点添加颜色
    bpmnData.map(item => {
      const shapeObj = allShapes.find(
        subItem => subItem.businessObject.id === item.id
      );
      if (shapeObj && shapeObj.id) {
        // 节点状态
        canvas.addMarker(item.id, 'highlight-' + item.runState);
        if (shapeObj.incoming && shapeObj.incoming.length) {
          // 节点连线来源状态
          shapeObj.incoming.map(subItem => {
            canvas.addMarker(subItem.id, 'highlight-line-' + item.runState);
          });
        }
      }
    });
  }

  render() {
    const {hidePanel, hideFold, hideCount, readonly} = this.state;
    const {height, width} = this.props;
    const styleObj = {
      width: width || '100%',
      height: height || '100vh'
    };
    return (
      <div>
        <div className={'container'} style={styleObj}>
          <div className={'canvas'} id='canvas' />
          {!readonly ? (
            <div>
              <div
                className={`properties-panel-parent`}
                id='properties-panel'
                style={{height: '100%'}}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Bpmn;
