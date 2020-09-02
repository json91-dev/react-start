import React, {useReducer, createContext, useMemo} from 'react';
import Table from "./Table";
import Form from './Form'

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
};

export const TableContext = createContext({
  // 초기값을 설정한다.
  tableData: [
    [-1, -1, -1, -1, -1, -7, -1,],
    [-1, -7, -1, -1, -1, -1, -1,],
    [-1, -1, -1, -1, -1, -1, -1,],
    [-1, -1, -1, -7, -1, -1, -1,],
    [-1, -1, -1, -1, -1, -7, -1,],
  ],
  dispatch: () => {
  },
});

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  // 0부터 99까지의 숫자
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });

  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for(let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
};

export  const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      }
    }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // 캐싱
  // dispatch는 항상 바뀌기 때문에 바뀌는 목록에 추가하지 않아도 됨.
  const value = useMemo(()=> ({tableData: state.tableData, dispatch}), [state.tableData]);

  /**
   * 전달할 값을 value로 전달함.
   * TableContext는 최적화하기가 상당히 힘듦
   * <TableContext.Provider value={{tableData: state.tableData, dispatch}}>
   * 위처럼 사용하면 MineSearch객체가 리랜더링 될때마다 객체가 새로생기고 자식들도 매번 리렌더링됨
   * 따라서 useMemo로 캐싱을  해줘야함.
   */
  return (
    <TableContext.Provider value={value}>
      <Form/>
      <div>{state.timer}</div>
      <Table/>
      <div>{state.result}</div>
    </TableContext.Provider>
  )
};

export default MineSearch;
