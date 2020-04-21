import React from 'react';
import Table from './Table';
import {useCallback, useReducer,} from 'react';

// 초기화할 state를 선언한다.
const initialState = {
  winner: '',
  turn: '0',
  tableData: [['','',''],['','',''],['','','']],
};

const SET_WINNER = 'SET_WINNER';
// 줄인다라는 의미의 함수이다.
const reducer = (state, action) => {
  switch(action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      }
  }
};

const TicTaeToe = () => {
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
  
  // 액션을 dispatch, 하고 액션 수
  const onClickTable = useCallback(() => {
    dispatch({type: 'SET_WINNER', winner: 'O'})
  }, []);
  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData}/>
      {/*테이블을을 클릭하면 O로 바꿈*/}
     {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  )
};

export default TicTaeToe;

