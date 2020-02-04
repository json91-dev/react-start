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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  render() {
    const { winNumbers, bonus, redo } = this.state;
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

export default Lotto;
