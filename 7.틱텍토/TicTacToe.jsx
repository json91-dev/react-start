import React from 'react';
import Table from './Table';
import {useCallback, useReducer,} from 'react';

// 초기화할 state를 선언한다.
const initialState = {
  winner: '',
  turn: '0',
  tableData: [['','',''],['','',''],['','','']],
  recentCell: [-1, -1]
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
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
        recentCell: [action.row, action.cell]
      };
      
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
    }
  }
};

const TicTaeToe = () => {
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner } = state;
  // 액션을 dispatch, 하고 액션 수
  // 컴포넌트에 넣는 함수들은 모두 useCallback을 사용
  // Dispatch 안에들어가는 아이들을 ACTION 이라고 함
  const onClickTable = useCallback(() => {
    dispatch({type: 'SET_WINNER', winner: 'O'})
  }, []);
  
  // dispatch 수행이 비동기적으로 일어나기때문에 useEffect를 사용하여 처리.
  
  useEffect(() => {
    const [row, cell] = recentCell;
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
    
    }
    
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = ture;
    }
  }, [tableData]);
  
  
  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
      {/*테이블을을 클릭하면 O로 바꿈*/}
     {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  )
};

export default TicTaeToe;

