import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { App } from './components/app';

require('application.css');
window.subscribeForEntries((_, data) => renderApp(data));

const renderApp = (data) => {
  ReactDOM.render(
    <App entries={data.entries} time={data.time} title={data.title} />,
    document.getElementById('root')
  );
};
