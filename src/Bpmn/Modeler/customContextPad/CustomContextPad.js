import {assign, forEach} from 'min-dash';
import {createExclusiveGateway} from '../createGateWay';

const openType = ['bpmn:UserTask', 'bpmn:ExclusiveGateway', 'bpmn:StartEvent'];

export default class CustomContextPad {
  constructor(
    config,
    contextPad,
    create,
    elementFactory,
    injector,
    translate,
    modeling,
    connect
  ) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.modeling = modeling;
    this.connect = connect;
    //自动摆放位置
    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }
    //注册工具
    contextPad.registerProvider(this);
    // 添加鼠标悬停事件监听
    // contextPad._eventBus.on('element.hover', event => {
    //   const element = event.element;
    //   if (!contextPad.isOpen(element) && openType.includes(element.type)) {
    //     contextPad.open(element);
    //   }
    // });
  }
  getContextPadEntries(element) {
    const {
      autoPlace,
      create,
      elementFactory,
      translate,
      modeling,
      connect
    } = this;

    function appendAction(type, className, title, options) {
      if (typeof title !== 'string') {
        options = title;
        title = translate('Append {type}', {type: type.replace(/^bpmn:/, '')});
      }

      function appendStart(event, element) {
        var shape = elementFactory.createShape(assign({type: type}, options));
        create.start(event, shape, {
          source: element
        });
      }

      var append = autoPlace
        ? function(event, element) {
            var shape = elementFactory.createShape(
              assign({type: type}, options)
            );

            autoPlace.append(element, shape);
          }
        : appendStart;

      return {
        group: 'model',
        className: className,
        title: title,
        action: {
          dragstart: appendStart,
          click: append
        }
      };
    }

    function startConnect(event, element) {
      connect.start(event, element);
    }

    function appendUserTask(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({type: 'bpmn:UserTask'});
        autoPlace.append(element, shape);
      } else {
        appendUserTaskStart(event, element);
      }
    }

    function appendUserTaskStart(event) {
      const shape = elementFactory.createShape({type: 'bpmn:UserTask'});
      create.start(event, shape, element);
    }
    function appendCallActivityStart(event) {
      const shape = elementFactory.createShape({type: 'bpmn:CallActivity'});
      create.start(event, shape, element);
    }

    function appendCallActivity(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({type: 'bpmn:CallActivity'});
        autoPlace.append(element, shape);
      } else {
        appendCallActivityStart(event, element);
      }
    }

    function appendExclusiveGateway(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({
          type: 'bpmn:ExclusiveGateway'
        });
        const eventBus = modeling._eventBus;
        createExclusiveGateway(
          elementFactory,
          event,
          shape,
          eventBus,
          modeling,
          translate,
          create,
          function() {
            modeling.connect(element, shape);
          }
        );
      } else {
        appendCallActivityStart(event, element);
      }
    }

    function appendExclusiveGatewayStart(event) {
      const shape = elementFactory.createShape({type: 'bpmn:ExclusiveGateway'});
      const eventBus = modeling._eventBus;
      createExclusiveGateway(
        elementFactory,
        event,
        shape,
        eventBus,
        modeling,
        translate,
        create
      );
    }

    function removeElement(e) {
      // 点击的时候实现删除功能
      modeling.removeElements([element]);
    }
    var actions = {};

    if (element.type === 'label') {
      return actions;
    }
    if (
      element.type === 'bpmn:UserTask' ||
      element.type === 'bpmn:CallActivity' ||
      element.type === 'bpmn:ServiceTask' ||
      // element.type === "bpmn:SequenceFlow" ||  // 隐藏连线展示
      element.type === 'bpmn:StartEvent' ||
      element.type === 'bpmn:ExclusiveGateway' ||
      element.type === 'bpmn:InclusiveGateway' ||
      element.type === 'bpmn:ParallelGateway'
    ) {
      actions = {
        'append.end-event': appendAction(
          'bpmn:EndEvent',
          'bpmn-icon-end-event-none',
          translate('Append EndEvent')
        ),
        // 'append.gateway': appendAction(
        //   'bpmn:ExclusiveGateway',
        //   'bpmn-icon-gateway-none',
        //   translate('Append Gateway')
        // ),
        'append.gateway': {
          group: 'model',
          className: 'bpmn-icon-gateway-none',
          title: translate('Append') + ' ' + translate('Gateway'),
          action: {
            click: appendExclusiveGateway,
            dragstart: appendExclusiveGatewayStart
          }
        },
        'append.intermediate-event': appendAction(
          'bpmn:IntermediateThrowEvent',
          'bpmn-icon-intermediate-event-none',
          translate('Append Intermediate/Boundary Event')
        ),
        'append.user-task': {
          group: 'model',
          className: 'bpmn-icon-user-task',
          title: translate('Append') + ' ' + translate('UserTask'),
          action: {
            click: appendUserTask,
            dragstart: appendUserTaskStart
          }
        },
        // "append.call-activity": {
        // 	group: "model",
        // 	className: "bpmn-icon-call-activity",
        // 	title: translate("Append CallActivity"),
        // 	action: {
        // 		click: appendCallActivity,
        // 		dragstart: appendCallActivityStart,
        // 	},
        // },
        connect: {
          group: 'connect',
          className: 'bpmn-icon-connection-multi',
          title: translate('Connect using DataInputAssociation'),
          action: {
            click: startConnect,
            dragstart: startConnect
          }
        }
      };
    } else {
      actions = {};
    }
    // 所有节点都有删除,除了条件分支的name为其他条件的线
    if (
      !(element.type === 'bpmn:SequenceFlow' && element.name === '其他条件')
    ) {
      assign(actions, {
        delete: {
          group: 'edit',
          className: 'bpmn-icon-trash',
          title: translate('Remove'),
          action: {
            click: removeElement
          }
        }
      });
    }
    return actions;
  }
}
CustomContextPad.$inject = [
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate',
  'modeling',
  'connect'
];
