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

const TableContext = createContext({
  // 초기값을 설정한다.
  tableData: [
    [-1, -1, -1, -1, -1, -1, -1,],
    [],
    [],
    [],
    [],
  ],
  dispatch: () => {
  },
});

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
      <div>
        <Table/>
      </>
    </TableContext.Provider>
  )
};

export default MineSearch;
