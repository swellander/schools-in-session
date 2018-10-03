const axios = require('axios');
const SET_USER = 'SET_USER';

const setUser = user => (
  {
    type: SET_USER,
    user
  }
)

export const _exchangeTokenForAuth = (history) => dispatch => {
  const token = window.localStorage.getItem('token');
  if (!token) return;
  return axios.get('/api/auth', {
    headers: {
      authorization: token
    }
  })
    .then(response => response.data)
    .then(user => {
      dispatch(setUser(user))
      // history.push('/');
    })
    .catch(err => {
      throw err;
    })
}

export const _loginUser = (user, history) => dispatch => {
  return axios.post('/api/auth', user)
    .then(response => response.data)
    .then(payload => {
      console.log('wooo', payload);
      window.localStorage.setItem('token', payload.token);
      const action = _exchangeTokenForAuth(history);
      dispatch(action);
      history.push('/');
    })
    .catch(err => {
      throw err;
    })
}

export const logoutUser = history => {
  window.localStorage.removeItem('token');
  return setUser({});
  // history.push('/');
}

export default (state = {}, action) => {
  if (action.type == SET_USER) return action.user
  return state;
}