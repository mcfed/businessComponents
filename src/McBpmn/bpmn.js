import React, {PureComponent} from 'react';
import {notification} from 'antd';
import BpmnModeler from './BpmnEditor/Modeler';
import BpmnViewer from 'bpmn-js/lib/Viewer';

import {defaultXml} from './BpmnEditor/sources/xml';

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
      this.handlePanelFold();
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

  download = (type, data, name) => {
    let dataTrack = '';
    const a = document.createElement('a');

    switch (type) {
      case 'xml':
        dataTrack = 'bpmn';
        break;
      case 'svg':
        dataTrack = 'svg';
        break;
      default:
        break;
    }

    name = name || `diagram.${dataTrack}`;

    a.setAttribute(
      'href',
      `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
    );
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
    a.setAttribute('download', name);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 导入 xml 文件
  handleOpenFile = e => {
    const that = this;
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      let data = '';
      reader.readAsText(file);
      reader.onload = function(event) {
        data = event.target.result;
        that.renderDiagram(data, 'open');
      };
    }
  };

  // 前进
  handleRedo = () => {
    this.bpmnModeler.get('commandStack').redo();
  };

  // 后退
  handleUndo = () => {
    this.bpmnModeler.get('commandStack').undo();
  };

  // 下载 SVG 格式
  handleDownloadSvg = () => {
    this.bpmnModeler.saveSVG({format: true}, (err, data) => {
      this.download('svg', data);
    });
  };

  // 下载 XML 格式
  handleDownloadXml = () => {
    this.bpmnModeler.saveXML({format: true}, (err, data) => {
      this.download('xml', data);
    });
  };

  // 流程图放大缩小
  handleZoom = radio => {
    const newScale = !radio
      ? 1.0 // 不输入radio则还原
      : this.state.scale + radio <= 0.2 // 最小缩小倍数
      ? 0.2
      : this.state.scale + radio;

    this.bpmnModeler.get('canvas').zoom(newScale);
    this.setState({
      scale: newScale
    });
  };

  // 渲染 xml 格式
  renderDiagram = xml => {
    const me = this;
    const {getBpmn, elementChange} = me.props;
    const viewer = this.bpmnModeler;
    this.bpmnModeler.importXML(xml, (err, data) => {
      if (err) {
        notification.error({
          message: '提示',
          description: '导入失败'
        });
      } else {
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

  // 预览图片
  handlePreview = () => {
    this.bpmnModeler.saveSVG({format: true}, (err, data) => {
      this.setState({
        svgSrc: data,
        svgVisible: true
      });
    });
  };

  // 预览XML
  handlePreviewXml = () => {
    this.bpmnModeler.saveXML({format: true}, (err, data) => {
      console.log(data);
    });
  };

  // 折叠
  handlePanelFold = () => {
    const {hidePanel} = this.state;
    this.setState({
      hidePanel: !hidePanel,
      hideCount: 1
    });
  };

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
                className={`properties-panel-fold
                                ${
                                  hideCount === 1
                                    ? hidePanel
                                      ? 'fold'
                                      : ''
                                    : ''
                                }
                                ${
                                  hideCount === 1
                                    ? hideFold
                                      ? 'hide'
                                      : ''
                                    : ''
                                }
                            `}
                id='js-panel-fold'
                title='折叠'
                onClick={this.handlePanelFold}
              />
              <div
                className={`properties-panel-parent ${
                  hideCount === 1 ? (hidePanel ? 'hidePanel' : 'showPanel') : ''
                }`}
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
