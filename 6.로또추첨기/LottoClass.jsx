import React, { Component } from 'react';
import Ball from './Ball'

function getWinNumbers() {
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    // 1 ~ 45 까지의 숫자중 갯수가 1인 배열을 만든다음 0번째 index shuffle에 push한다. candidate 배열의 크기는 1 감소한다.
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }

  // 섞은 shuffle의 맨 마지막을 보너스 숫자로 결정한다.
  const bonusNumber = shuffle[shuffle.length -1];
  // 섞인 shuffle을 6개 가져온뒤 오름차순으로 정렬한다.
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);


  return [...winNumbers, bonusNumber];
}

class LottoClass extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length -1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          // 리엑트에 state배열에 값을 넣을때는 push를 사용하면 안되고 아래와 같이 사용하여야 한다.
          return {
            winBalls: [...prevState.winBalls,  winNumbers[i]],
          }
        });
      }, (i + 1) * 1000);
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      })
    }, 7000)
  };

  componentDidMount() {
    this.runTimeouts();
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    })
  }

  // 특정 상황을 만족할때 componentDidUpdate 수
  componentDidUpdate(prevProps, prevState) {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  // 한번 더 뽑을 때 기존 스테이트 초기화
  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자></div>
        <div id="결과창">
          {winBalls.map((v)=> <Ball key={v} number={v} />)}
        </div>
        <div>보너스!!</div>
        {bonus && <Ball number={bonus}/>}
        <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더!</button>
      </>
    )
  }
}

export default LottoClass;
