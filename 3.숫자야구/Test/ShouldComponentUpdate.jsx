import React, { Component } from 'react';

class Test extends Component {
  state = {
    counter: 0,
  };

  //현재 카운터와 미래의 카운터가 다를때마다 rendering을 다시하라
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.state.count !== nextState.counter) {
      return true;
    }
    return false;
  }

  onClick = () => {
    this.setState({});
  };

  render() {
    console.log('렌더링', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    )
  }
}
