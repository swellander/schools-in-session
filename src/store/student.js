import axios from 'axios';
import { _loadSchools } from './school';

const initialState = {
  list: []
}

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';

const loadStudents = students => ({ type: LOAD_STUDENTS, students });
const addStudent = student => ({ type: ADD_STUDENT, student });

export const _loadStudents = () => dispatch => (
  axios.get('/api/students')
    .then(response => response.data)
    .then(students => dispatch(loadStudents(students)))
    .catch(err => {
      alert(err);
    })
)

export const _addStudent = student => dispatch => (
  axios.post('/api/students', student)
    .then(response => response.data)
    .then(student => {
      dispatch(addStudent(student))

      //TODO: QUESTION: figure out a different way to structure this
      dispatch(_loadSchools()) //reload shcools to update their student lists

    })
    .catch(err => {
      throw err;
    })
)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return { ...state, list: action.students }
    case ADD_STUDENT:
      console.log('STUDDD', action.student)
      return { ...state, list: [...state.list, action.student] }
    default:
      return state;
  }
}

export default reducer;