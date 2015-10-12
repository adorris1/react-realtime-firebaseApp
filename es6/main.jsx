import React from 'react';
import Feed from './components/Feed.jsx';
import ReactDOM from 'react-dom';

window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.render(<Feed />, document.getElementById('app'));
