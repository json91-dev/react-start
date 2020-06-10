const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import Transition from './Transition';

const Hot = hot(Transition);
ReactDom.render(<Hot/>, document.querySelector('#root'));
