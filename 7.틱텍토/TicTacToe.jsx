import React from 'react';
import Table from './Table';
import {useCallback, useReducer,} from 'react';

// 초기화할 state를 선언한다.
const initialState = {
  winner: '',
  turn: '0',
  tableData: [['','',''],['','',''],['','','']],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
// 줄인다라는 의미의 함수이다.
const reducer = (state, action) => {
  switch(action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL:
      const tableData = [...state.tableData];
      // immer라는 라이브러리로 가독성 해결
      // 불변성 해결
      // tableData[action.row] = [tableData[action.row] => 불변성이 유지되지 않음..
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      
      return {
        ...state,
        tableData,
      }
  }

};

const TicTaeToe = () => {
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
  
  // 액션을 dispatch, 하고 액션 수
  // 컴포넌트에 넣는 함수들은 모두 useCallback을 사용
  // Dispatch 안에들어가는 아이들을 ACTION 이라고 함
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

