import axios from 'axios';

const initialState = {
  list: []
}

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const ADD_SCHOOL = 'ADD_SCHOOL';

const loadSchools = schools => ({ type: LOAD_SCHOOLS, schools });
const addSchool = school => ({ type: ADD_SCHOOL, school });

export const _loadSchools = () => dispatch => (
  axios.get('/api/schools')
    .then(response => response.data)
    .then(schools => dispatch(loadSchools(schools)))
    .catch(err => {
      alert(err);
    })
)
export const _addSchool = school => dispatch => (
  axios.post('/api/schools', school)
    .then(response => response.data)
    .then(school => {
      dispatch(addSchool(school));
    })
    .catch(err => {
      throw err;
    })
)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SCHOOLS:
      return { ...state, list: action.schools }
    case ADD_SCHOOL:
      return { ...state, list: [...state.list, action.school] }
    default:
      return state;
  }
}

export default reducer;