import React, { useContext, useCallback } from 'react';
import { CLICK_MINE, CODE, OPEN_CELL, TableContext } from './MineSearch';
import { FLAG_CELL, NORMALIZE_CELL, QUESTION_CELL } from './MineSearch';

const getTdStyle = (code) => {
  switch(code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.OPENED:
      return {
        background: 'white'
      };

    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: 'yellow'
      };

    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: 'red',
      };

    default:
      return {
        background: 'white'
      };

  }
};


const getTdText = (code) => {
  switch(code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';

    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';

    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    default:
      return '';
  }
};


const Td = ({rowIndex, cellIndex}) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;

      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex});
        return;

      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex});
        return;

      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex]]);

  const onRightClickTd = useCallback((e) => {
    e.preventDefault();

    if (halted) {
      return;
    }

    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex});
        return;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
        return;

      default:
        return;
    }

  }, [tableData[rowIndex][cellIndex]]);
  return (
    <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(tableData[rowIndex][cellIndex])}</td>
  )
};

export default Td;
