import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './components/Feed.jsx';

window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.render(
  <Feed />,
  document.getElementById('app')
);
