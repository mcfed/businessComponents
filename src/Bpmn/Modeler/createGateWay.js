export function createExclusiveGateway(
  elementFactory,
  event,
  shape,
  eventBus,
  modeling,
  translate,
  create,
  func
) {
  // 延迟创建和连接 UserTasks
  const task1Position = {
    x: 100,
    y: -80
  };
  const task2Position = {
    x: 100,
    y: 80
  };
  const task1 = elementFactory.createShape({
    type: 'bpmn:UserTask',
    ...task1Position
  });

  const task2 = elementFactory.createShape({
    type: 'bpmn:UserTask',
    ...task2Position
  });

  create.start(event, [shape, task1, task2], {
    hints: {
      autoSelect: [shape]
    }
  });

  const callback = function(event) {
    const flow1 = modeling.connect(shape, task1, {
      type: 'bpmn:SequenceFlow',
      name: translate('ExclusiveGateway') + 1
    });

    const flow2 = modeling.connect(shape, task2, {
      type: 'bpmn:SequenceFlow',
      name: translate('otherCondition')
    });
    modeling.updateLabel(flow1, translate('ExclusiveGateway') + 1);
    modeling.updateLabel(flow2, translate('otherCondition'));
    if (func) {
      func(task1, task2);
    }
    eventBus.off('create.end', callback);
  };
  eventBus.on('create.end', callback);
  // 立即创建连接
}
