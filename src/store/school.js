import axios from 'axios';

const initialState = {
  list: []
}

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const ADD_SCHOOL = 'ADD_SCHOOL';
const DELETE_SCHOOL = 'DELETE_SCHOOL';

const loadSchools = schools => ({ type: LOAD_SCHOOLS, schools });
const addSchool = school => ({ type: ADD_SCHOOL, school });
const deleteSchool = id => ({ type: DELETE_SCHOOL, id })

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
export const _deleteSchool = id => dispatch => (
  axios.delete(`/api/schools/${id}`)
    .then(response => {
      if (response.status == 202) {
        dispatch(deleteSchool(id))
      } else {
        throw new Error('school with that id does not exist')
      }
    })
)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SCHOOLS:
      return { ...state, list: action.schools }
    case ADD_SCHOOL:
      return { ...state, list: [...state.list, action.school] }
    case DELETE_SCHOOL:
      return { ...state, list: state.list.filter(school => school.id !== action.id) }
    default:
      return state;
  }
}

export default reducer;