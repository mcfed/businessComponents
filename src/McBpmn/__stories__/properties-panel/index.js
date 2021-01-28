import ReactDOM from 'react-dom';
import React from 'react';

import PropertiesView from './PropertiesView';

export default class PropertiesPanel {
  constructor(options) {
    const {modeler, container, onChange} = options;

    ReactDOM.render(
      <PropertiesView
        onChange={this.onCommonChange.bind(this)}
        modeler={modeler}
      />,
      container
    );
  }
  onCommonChange(changeObj, modeler, element) {
    const modeling = modeler.get('modeling');
    modeling.updateProperties(element, changeObj);
  }
}
