import axios from 'axios';

const initialState = {
  list: []
}

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';

const loadSchools = schools => ({ type: LOAD_SCHOOLS, schools });

export const _loadSchools = () => dispatch => (
  axios.get('/api/schools')
    .then(response => response.data)
    .then(schools => dispatch(loadSchools(schools)))
    .catch(err => {
      alert(err);
    })
)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SCHOOLS:
      return { ...state, list: action.schools }
    default:
      return state;
  }
}

export default reducer;