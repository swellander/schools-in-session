import { render } from 'react-dom';
import React from 'react';
import Main from './components/Main';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

// const App = () => (
//   <Provider store={store}>
//     <Router>
//       <MuiThemeProvider theme={theme}>
//         <Main />
//       </MuiThemeProvider>
//     </Router>
//   </Provider>
// );



render(
  <Provider store={store}> <Router><MuiThemeProvider theme={theme}><Main /></MuiThemeProvider></Router></Provider>
  , document.getElementById('app'));