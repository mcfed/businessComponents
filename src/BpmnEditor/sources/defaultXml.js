export const defaultXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://www.flowable.org/processdef" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" name="" isExecutable="true">
    <bpmn2:startEvent id="Event_1gjt6vr" name="开始">
      <bpmn2:outgoing>Flow_15lu2ff</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:sequenceFlow id="Flow_15lu2ff" sourceRef="Event_1gjt6vr" targetRef="Event_1s0mtxb" />
    <bpmn2:endEvent id="Event_1s0mtxb" name="结束">
      <bpmn2:incoming>Flow_15lu2ff</bpmn2:incoming>
    </bpmn2:endEvent>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_15lu2ff_di" bpmnElement="Flow_15lu2ff">
        <di:waypoint x="828" y="190" />
        <di:waypoint x="1052" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_1gjt6vr_di" bpmnElement="Event_1gjt6vr">
        <dc:Bounds x="792" y="172" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="799" y="215" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1s0mtxb_di" bpmnElement="Event_1s0mtxb">
        <dc:Bounds x="1052" y="172" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1059" y="215" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>

`;
