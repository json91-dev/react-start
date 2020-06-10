import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
class ColorPicker extends Component {
  handleChange(color, event) {
    window.alert(color.hex+"");
  }
  
  componentDidMount() {
  
  }
  render() {
    return <CirclePicker onChange={ this.handleChange } />;
  }
}

export default ColorPicker;
