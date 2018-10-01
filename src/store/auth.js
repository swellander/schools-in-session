const axios = require('axios');
const SET_USER = 'SET_USER';

const setUser = user => (
  {
    type: SET_USER,
    user
  }
)

export const _loginUser = user => dispatch => {
  console.log('yoo');
  return axios.post('/api/auth', user)
    .then(response => response.data)
    .then(payload => {
      const action = setUser(payload.user)
      dispatch(action);
    })
    .catch(err => console.log(err))
}

export default (state = {}, action) => {
  if (action.type == SET_USER) return action.user
  return state;
}