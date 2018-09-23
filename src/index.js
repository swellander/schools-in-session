import { render } from 'react-dom';
import React from 'react';
import Main from './components/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
);

render(<App />, document.getElementById('app'));