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

  // 创建一个隐藏的任务节点
  const hiddenTask = elementFactory.createShape({
    type: 'bpmn:Task',
    x: (shape.x ?? 0) + 200, // 根据需要设置位置
    y: (shape.y ?? 0) - 16,
    hidden: true,
    attrs: {
      visibility: 'hidden',
      opacity: 0
    }
  });
  // const task1 = elementFactory.createShape({
  //   type: 'bpmn:UserTask',
  //   ...task1Position
  // });

  // const task2 = elementFactory.createShape({
  //   type: 'bpmn:UserTask',
  //   ...task2Position
  // });

  create.start(event, [shape, hiddenTask], {
    hints: {
      autoSelect: [shape]
    }
  });

  console.log({hiddenTask, shape}, shape.x, shape.y);
  const callback = function(event) {
    // 检查创建是否成功
    if (!event.context.canExecute || event.canceled) {
      // 创建被取消，清理事件监听器
      eventBus.off('create.end', callback);
      return;
    }

    try {
      // 检查shape是否成功创建并添加到画布
      if (!shape.parent) {
        console.warn('创建节点失败，节点未添加到画布');
        eventBus.off('create.end', callback);
        return;
      }

      // 检查hiddenTask是否成功创建
      if (!hiddenTask.parent) {
        console.warn('隐藏任务创建失败');
        eventBus.off('create.end', callback);
        return;
      }

      const flow2 = modeling.connect(shape, hiddenTask, {
        type: 'bpmn:SequenceFlow',
        name: translate('otherCondition')
      });

      // 确保连接创建成功
      if (flow2) {
        modeling.updateLabel(flow2, translate('otherCondition'));
      }

      if (func) {
        func(hiddenTask);
      }
    } catch (error) {
      console.error('创建连接线时发生错误:', error);
    } finally {
      // 无论成功或失败，都清理事件监听器
      eventBus.off('create.end', callback);
    }
  };

  // 添加create.cancel事件监听，确保在创建取消时清理
  const cancelCallback = function() {
    eventBus.off('create.end', callback);
    eventBus.off('create.cancel', cancelCallback);
  };

  eventBus.on('create.cancel', cancelCallback);
  eventBus.on('create.end', callback);
  // 立即创建连接
}
