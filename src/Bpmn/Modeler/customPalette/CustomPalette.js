import {assign} from 'min-dash';
import {createExclusiveGateway} from '../createGateWay';

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default class CustomPalette {
  constructor(
    palette,
    create,
    elementFactory,
    spaceTool,
    lassoTool,
    handTool,
    globalConnect,
    translate
  ) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.spaceTool = spaceTool;
    this.lassoTool = lassoTool;
    this.handTool = handTool;
    this.globalConnect = globalConnect;
    this.translate = translate;
    palette.registerProvider(this);
  }

  getPaletteEntries = () => {
    const actions = [];
    const {
      create,
      elementFactory,
      translate,
      spaceTool,
      lassoTool,
      handTool,
      globalConnect
    } = this;

    function createAction(type, group, className, title, options, customType) {
      function createListener(event) {
        const shape = elementFactory.createShape(
          assign({type}, options, {customType})
        );

        if (options) {
          shape.businessObject.di.isExpanded = options.isExpanded;
        }

        if (type === 'bpmn:ExclusiveGateway') {
          const eventBus = spaceTool._eventBus;
          const modeling = spaceTool._modeling;
          createExclusiveGateway(
            elementFactory,
            event,
            shape,
            eventBus,
            modeling,
            translate,
            create
          );
        } else {
          create.start(event, shape);
        }
      }

      const shortType = type.replace(/^bpmn:/, '');
      const action = {
        group,
        className,
        title: (title && translate(title)) || translate(`Create ${shortType}`),
        action: {
          dragstart: createListener,
          click: createListener
        }
      };
      return action;
    }

    assign(actions, [
      // {
      // 	title: translate("Tools"),
      // 	group: "tools",
      // 		children: [
      // 			{
      // 				id: "hand-tool",
      // 				group: "tools",
      // 				className: "bpmn-icon-hand-tool",
      // 				title: translate("Activate the hand tool"),
      // 				action: {
      // 					click: (event) => {
      // 						handTool.activateHand(event);
      // 					},
      // 				},
      // 			},
      // 			{
      // 				id: "lasso-tool",
      // 				group: "tools",
      // 				className: "bpmn-icon-lasso-tool",
      // 				title: translate("Activate the lasso tool"),
      // 				action: {
      // 					click: (event) => {
      // 						lassoTool.activateSelection(event);
      // 					},
      // 				},
      // 			},
      // 			{
      // 				id: "space-tool",
      // 				group: "tools",
      // 				className: "bpmn-icon-space-tool",
      // 				title: translate("Activate the create/remove space tool"),
      // 				action: {
      // 					click: (event) => {
      // 						spaceTool.activateSelection(event);
      // 					},
      // 				},
      // 			},
      // 			{
      // 				id: "global-connect-tool",
      // 				group: "tools",
      // 				className: "bpmn-icon-connection-multi",
      // 				title: translate("Activate the global connect tool"),
      // 				action: {
      // 					click: (event) => {
      // 						globalConnect.toggle(event);
      // 					},
      // 				},
      // 			},
      // 		],
      // },
      // {
      // 	title: translate("FlowGateway"),
      // 	group: "flowGateway",
      // 	children: [
      // 		{
      // 			id: "create.exclusive-gateway",
      // 			...createAction("bpmn:ExclusiveGateway", "gateway", "bpmn-icon-gateway-xor"),
      // 		},
      // 		{
      // 			id: "create.parallel-gateway",
      // 			...createAction("bpmn:ParallelGateway", "gateway", "bpmn-icon-gateway-parallel"),
      // 		},
      // 		{
      // 			id: "create.inclusive-gateway",
      // 			...createAction("bpmn:InclusiveGateway", "gateway", "bpmn-icon-gateway-or"),
      // 		},
      // 	],
      // },
      {
        title: translate('ProcessControl'),
        group: 'processControl',
        children: [
          {
            id: 'create.start-event',
            ...createAction(
              'bpmn:StartEvent',
              'event',
              'bpmn-icon-start-event-none'
            )
          },
          {
            id: 'create.user-task',
            ...createAction('bpmn:UserTask', 'activity', 'bpmn-icon-user-task')
          },
          // {
          // 	id: "create.service-task",
          // 	...createAction("bpmn:ServiceTask", "activity", "bpmn-icon-service-task"),
          // },
          // {
          // 	id: "create.call-activity",
          // 	...createAction("bpmn:CallActivity", "activity", "bpmn-icon-call-activity"),
          // },
          {
            id: 'create.gateway',
            ...createAction(
              'bpmn:ExclusiveGateway',
              'event',
              'bpmn-icon-gateway-none'
            )
          },
          {
            id: 'create.end-event',
            ...createAction(
              'bpmn:EndEvent',
              'event',
              'bpmn-icon-end-event-none'
            )
          }
        ]
      }
    ]);
    return actions;
  };
}

CustomPalette.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
  'handTool',
  'globalConnect',
  'translate'
];
