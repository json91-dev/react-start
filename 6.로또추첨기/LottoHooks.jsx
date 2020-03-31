import React, {Component, useState, useRef, useEffect,useMemo, useCallback} from 'react';
import Ball from './Ball'

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    // 1 ~ 45 까지의 숫자중 갯수가 1인 배열을 만든다음 0번째 index shuffle에 push한다. candidate 배열의 크기는 1 감소한다.
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }

  // 섞은 shuffle의 맨 마지막을 보너스 숫자로 결정한다.
  const bonusNumber = shuffle[shuffle.length - 1];
  // 섞인 shuffle을 6개 가져온뒤 오름차순으로 정렬한다.
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  // 해당 부분에서 반복이 발생합니다. Hooks에서는 렌더링할때마다 getWinNumbers를 호출하기 때문에 이부분에 대한 처리가 필요합니다.
  // 두번째 인자가 바뀌지 않는한 이 useMemo는 다시실행되지 않습니다. (두번째 배열에 들어간 요소가 바뀌면 다시 실행)
  // useMemo: 복잡한 함수 결과 값을 기억, useRef: 일반 값을 기억
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
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
  }, [timeouts.current]); // 두번째 인자가 빈배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate를 둘 다 수행
  // 배열안에 조건을 삽입하면 해당 조건이 만족시 componentDidUpdate처럼 동작합니다.


  // const onClickRedo = () => {
  //   console.log('onClickRedo');
  //   setWinNumbers(getWinNumbers());
  //   setWinBalls([]);
  //   setBonus(null);
  //   timeouts.current = [];
  // };

  // useCallback으로 만들게 되면 함수 자체를 기억합니다.
  // 함수 컴포넌트가 재실행되어도, 함수(onClickRedo)가 새로 생성되지 않습니다.
  // useCallback안에서
  const onClickRedo = useCallback(() => {
    // useCallback을 사용하면 기억을 너무 잘해서 처음에 추출한 winNumbers만 가지고 있게 됩니다.
    // 배열로 전달한 2번쨰 인자가 바뀌게 되면 새로 실행됩니다.
    console.log(winNumbers);
    console.log('onClickRedo');
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {/* 자식 함수에 callback을 넘길때는 꼭 UseCallback을 사용해야 합니다.*/}
          {/*useCallback이 없으면 매번 새로운 함수를 자식 컴포넌트로 전달하는데,*/}
          {/*자식 컴포넌트는 부모로 넘겨진 props가 바뀌었다고 생각하기 때문에 매번 새로 렌더링하게 됩니다.*/}
          {winBalls.map((v) => <Ball key={v} number={v} onClick={onClickRedo}/>)}
        </div>
        <div>보너스!!</div>
        {bonus && <Ball number={bonus}/>}
        {redo && <button onClick={onClickRedo}>한번 더!</button>}
      </>
  )
};


export default Lotto;
