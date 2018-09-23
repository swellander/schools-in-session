import { render } from 'react-dom';
import React from 'react';
import Main from './components/Main';

const App = () => (
  <Main />
);

render(<App />, document.getElementById('app'));