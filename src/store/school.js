import axios from 'axios';
import { _loadStudents } from './student';

const initialState = {
  list: []
}

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const ADD_SCHOOL = 'ADD_SCHOOL';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

const loadSchools = schools => ({ type: LOAD_SCHOOLS, schools });
const addSchool = school => ({ type: ADD_SCHOOL, school });
const deleteSchool = id => ({ type: DELETE_SCHOOL, id })
const updateSchool = school => ({ type: UPDATE_SCHOOL, school });

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
        dispatch(deleteSchool(id));
        dispatch(_loadStudents());
      } else {
        throw new Error('school with that id does not exist')
      }
    })
)
export const _updateSchool = school => dispatch => (
  axios.put(`/api/schools`, school)
    .then(response => response.data)
    .then(updatedSchool => {
      dispatch(updateSchool(updatedSchool));

      //TODO: Yup, definitely gotta fix this
      dispatch(_loadStudents());
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
    case DELETE_SCHOOL:
      return { ...state, list: state.list.filter(school => school.id !== action.id) }
    case UPDATE_SCHOOL:
      const filteredList = state.list.filter(school => school.id !== action.school.id);
      return { ...state, list: [...filteredList, action.school] }
    default:
      return state;
  }
}

export default reducer;