const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import LottoHooks from './LottoHooks';

const Hot = hot(LottoHooks);
ReactDom.render(<Hot/>, document.querySelector('#root'));
