import React, { Component } from 'react';
import Try from './Try';

class NumberBaseball extends Component {
  state = {
    answer: this.getNumbers(), // ex [1, 5, 3, 4]
    tries: [], // 시도
    value: '',
    result: '',
  };

  getNumbers() {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for(let i = 0; i < 4; i += 1) {
      // Math.random => 0 ~ 1 사이의 실수를 뽑아
      const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
    }
    return array;
  }

  onSubmitForm = () => {

  };

  onChangeInput = () => {

  };

  fruit = [
    {fruit: '사과', taste: '맛있다'},
    {fruit: '바나나', taste: '맛없다.'},
    {fruit: '포도', taste: '달당~!'},
  ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref="" minLength="4" maxLength="4" value={this.state.value} onChange={this.onChangeInput}/>
          <button>입력!!!</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.fruit.map((v, i) => {
            return (
              <Try value={v} index={i} />
            )
          })}
        </ul>
      </>
    )
  }
}

export default NumberBaseball; // import NumberBaseball
