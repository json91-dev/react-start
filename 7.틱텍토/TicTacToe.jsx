import React from 'react';
import Table from './Table';

// 초기화할 state를 선언한다.
const initialState = {
  winner: '',
  turn: '0',
  tableData: [['','',''],['','',''],['','','']],
};

// 줄인다라는 의미의 함수이다.
const reducer = () => {

};

const TicTaeToe = () => {
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
  
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <>
      <Table />
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};

export default TicTaeToe;

