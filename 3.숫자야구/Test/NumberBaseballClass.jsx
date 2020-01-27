import React, { Component, createRef } from 'react';
import Try from '../Try';

class NumberBaseball extends Component {
  state = {
    value: '',
    result: '',
    answer: this.getNumbers(), // ex [1, 5, 3, 4]
    tries: [], // 시도
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

  // input;
  //
  // onRefInput = (c) => {
  //   this.input = c;
  // };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) { // join함수는 배열을 하나로 만든다.

      // 이전값을 참조하여 현재 state를 만들때 아래와 같이 prevState를 사용
      this.setState((prevState) => {
        return {
          result: '홈런',
          tries: [...prevState.tries, { try: value, result: '홈런' }]
        }
      });
      alert('[정답] 게임을 다시 실행합니다.');

      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });

      this.inputRef.current.focus();

    } else { // 답 틀렸을
      if (this.state.tries.length >= 9) {
        this.setState({
          value: '',
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다.`,
          answer: this.getNumbers(),
          tries: []
        });
        this.input.focus();
        alert('게임을 다시 실행합니다.');

        return;
      }

      let strike = 0;
      let ball = 0;

      // 문자열을 숫자 배열로 바꿈.
      const answerArray = this.state.value.split('').map(v => parseInt(v));
      for (let i=0; i<4; i+= 1) {
        if(answerArray[i] === this.state.answer[i]) { // 숫자 자릿수 모두 정답
          strike ++;
        } else if (this.state.answer.includes(answerArray[i])) {
          ball ++;
        }
      }

      this.setState((prevState) => {
        return {
          value: '',
          tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]
        }
      });

      this.inputRef.current.focus();
    }
  };

  onChange = (e) => {
    this.setState({value: e.target.value})
  };

  inputRef = createRef();

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} minLength="4" maxLength="4" value={this.state.value} onChange={this.onChange}/>
          <button>입력!!!</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => {
            return (
              <Try key={`${i + 1}차 시도 :`} tryInfo = {v} />
            )
          })}
        </ul>
      </>
    )
  }
}

export default NumberBaseball; // import NumberBaseball
