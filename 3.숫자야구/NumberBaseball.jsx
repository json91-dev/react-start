import React, { Component, useState } from 'react';
import Try from './Try';


function getNumbers() {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    // Math.random => 0 ~ 1 사이의 실수를 뽑아
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) { // join함수는 배열을 하나로 만든다.
      setResult('홈런');
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: '홈런' }]
      });
      alert('[정답] 게임을 다시 실행합니다.');

      setValue('');
      setAnswer(getNumbers());
      setTries([]);

    } else { // 답 틀렸을
      if (tries.length >= 9) {
        this.setState({
          value: '',
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`,
          answer: getNumbers(),
          tries: []
        });
        this.input.focus();
        alert('게임을 다시 실행합니다.');
        return;
      }

      let strike = 0;
      let ball = 0;

      // 문자열을 숫자 배열로 바꿈.
      const answerArray = value.split('').map(v => parseInt(v));
      for (let i=0; i<4; i+= 1) {
        if(answerArray[i] === answer[i]) { // 숫자 자릿수 모두 정답
          strike += 1;
        } else if (answer.includes(answerArray[i])) {
          ball += 1;
        }
      }

      setValue('');
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]
      });
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return(
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input minLength="4" maxLength="4" value={value} onChange={onChangeInput}/>
        <button>입력!!!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return (
            <Try key={`${i + 1}차 시도 :`} tryInfo = {v} />
          )
        })}
      </ul>
    </>
  )
}

export default NumberBaseball; // import NumberBaseball
