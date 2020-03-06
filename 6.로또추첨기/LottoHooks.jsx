import React, { Component, useState, useRef, useEffect } from 'react';
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

const Lotto = () => {
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length -1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    //componentWillUnmount 부분을 return 으로 표시합니다.
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      })
    }
  },[timeouts]); // 두번째 인자가 빈배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate를 둘 다 수행
  // 배열안에 조건을 삽입하면 해당 조건이 만족시 componentDidUpdate처럼 동작합니다.


  const onClickRedo = () => {
    console.log('onClickRedo');
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    timeouts.current = [];
  }

  return (
    <>
      <div>당첨 숫자></div>
      <div id="결과창">
        {winBalls.map((v)=> <Ball key={v} number={v} />)}
      </div>
      <div>보너스!!</div>
      {bonus && <Ball number={bonus}/>}
      {redo && <button onClick={onClickRedo}>한번 더!</button>}
    </>
  )
};


export default Lotto;
