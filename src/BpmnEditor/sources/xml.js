export const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://www.flowable.org/processdef" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" name="" isExecutable="true">
    <bpmn2:startEvent id="Event_1gjt6vr" name="开始">
      <bpmn2:outgoing>Flow_15lu2ff</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:userTask id="Activity_0irvtx6" name="cwj" handler="cwj"  approvalType="1">
      <bpmn2:incoming>Flow_15lu2ff</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0nfwnzb</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="Flow_15lu2ff" sourceRef="Event_1gjt6vr"   targetRef="Activity_0irvtx6" />
    <bpmn2:exclusiveGateway id="Gateway_1b6xc5z"  >
      <bpmn2:incoming>Flow_0nfwnzb</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0lr5mk4</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="Flow_0nfwnzb" sourceRef="Activity_0irvtx6"   targetRef="Gateway_1b6xc5z" />
    <bpmn2:userTask id="Activity_1hqlmun" name="主管" handler="主管"  approvalType="2">
      <bpmn2:incoming>Flow_0lr5mk4</bpmn2:incoming>
      <bpmn2:outgoing>Flow_19ivwqr</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="Flow_0lr5mk4" sourceRef="Gateway_1b6xc5z"  targetRef="Activity_1hqlmun" />
    <bpmn2:exclusiveGateway id="Gateway_1pmyol0">
      <bpmn2:incoming>Flow_19ivwqr</bpmn2:incoming>
      <bpmn2:outgoing>Flow_13d6uod</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="Flow_19ivwqr" sourceRef="Activity_1hqlmun" targetRef="Gateway_1pmyol0" />
    <bpmn2:userTask id="Activity_1obf0qd" name="HR" handler="HR" approvalType="2">
      <bpmn2:incoming>Flow_13d6uod</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1uhifxo</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="Flow_13d6uod" sourceRef="Gateway_1pmyol0" targetRef="Activity_1obf0qd" />
    <bpmn2:endEvent id="Event_1s0mtxb" name="结束">
      <bpmn2:incoming>Flow_1uhifxo</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="Flow_1uhifxo" sourceRef="Activity_1obf0qd" targetRef="Event_1s0mtxb" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_1uhifxo_di" bpmnElement="Flow_1uhifxo">
        <di:waypoint x="1600" y="190" />
        <di:waypoint x="1682" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_13d6uod_di" bpmnElement="Flow_13d6uod">
        <di:waypoint x="1425" y="190" />
        <di:waypoint x="1500" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_19ivwqr_di" bpmnElement="Flow_19ivwqr">
        <di:waypoint x="1300" y="190" />
        <di:waypoint x="1375" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0lr5mk4_di" bpmnElement="Flow_0lr5mk4">
        <di:waypoint x="1125" y="190" />
        <di:waypoint x="1200" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0nfwnzb_di" bpmnElement="Flow_0nfwnzb">
        <di:waypoint x="1000" y="190" />
        <di:waypoint x="1075" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_15lu2ff_di" bpmnElement="Flow_15lu2ff">
        <di:waypoint x="828" y="190" />
        <di:waypoint x="900" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_1gjt6vr_di" bpmnElement="Event_1gjt6vr">
        <dc:Bounds x="792" y="172" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="799" y="215" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0irvtx6_di" bpmnElement="Activity_0irvtx6">
        <dc:Bounds x="900" y="150" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1b6xc5z_di" bpmnElement="Gateway_1b6xc5z" isMarkerVisible="true">
        <dc:Bounds x="1075" y="165" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1hqlmun_di" bpmnElement="Activity_1hqlmun">
        <dc:Bounds x="1200" y="150" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1pmyol0_di" bpmnElement="Gateway_1pmyol0" isMarkerVisible="true">
        <dc:Bounds x="1375" y="165" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1obf0qd_di" bpmnElement="Activity_1obf0qd">
        <dc:Bounds x="1500" y="150" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1s0mtxb_di" bpmnElement="Event_1s0mtxb">
        <dc:Bounds x="1682" y="172" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1689" y="215" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>  
`;

export const defaultXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://www.flowable.org/processdef" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" name="" isExecutable="true">
    <bpmn2:startEvent id="Event_08ivsah" name="开始">
      <bpmn2:outgoing>Flow_089y2ps</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:endEvent id="Event_19ide9a" name="结束">
      <bpmn2:incoming>Flow_089y2ps</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="Flow_089y2ps" sourceRef="Event_08ivsah" targetRef="Event_19ide9a" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_089y2ps_di" bpmnElement="Flow_089y2ps">
        <di:waypoint x="368" y="-90" />
        <di:waypoint x="552" y="-90" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_08ivsah_di" bpmnElement="Event_08ivsah">
        <dc:Bounds x="332" y="-108" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="339" y="-65" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_19ide9a_di" bpmnElement="Event_19ide9a">
        <dc:Bounds x="552" y="-108" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="559" y="-65" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;
