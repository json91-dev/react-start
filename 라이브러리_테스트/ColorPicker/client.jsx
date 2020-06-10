const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import ColorPicker from './ColorPicker';

const Hot = hot(ColorPicker);
ReactDom.render(<Hot/>, document.querySelector('#root'));
