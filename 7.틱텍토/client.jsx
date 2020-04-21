const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import TicTaeToe from './TicTacToe';

const Hot = hot(TicTaeToe);
ReactDom.render(<Hot />, document.querySelector('#root'));
