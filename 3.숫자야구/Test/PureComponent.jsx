import React, { PureComponent } from 'react';

export class Test extends PureComponent {
  state = {
    counter: 0,
    string: 'hello',
    number: 1,
    boolean: true,
    object: {},
    array: [],

  };

  onClick = () => {

    const object = this.state.object;


    this.setState({
      // array: [...this.state.array, 1]
      object: object
    })
  };

  render() {
    console.log('렌더링1', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    )
  }
}
