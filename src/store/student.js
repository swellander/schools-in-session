import axios from 'axios';
import { _loadSchools } from './school';

const initialState = {
  list: []
}

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

const loadStudents = students => ({ type: LOAD_STUDENTS, students });
const addStudent = student => ({ type: ADD_STUDENT, student });
const deleteStudent = id => ({ type: DELETE_STUDENT, id });

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
export const _deleteStudent = id => dispatch => {
  console.log('this is hit')
  return axios.delete(`/api/students/${id}`)
    .then(response => {
      if (response.status == 202) {
        dispatch(deleteStudent(id));
        dispatch(_loadSchools());
      } else {
        throw new Error('User to delete does not exist in db')
      }
    })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return { ...state, list: action.students }
    case ADD_STUDENT:
      console.log('STUDDD', action.student)
      return { ...state, list: [...state.list, action.student] }
    case DELETE_STUDENT:
      return { ...state, list: state.list.filter(student => student.id !== action.id) }
    default:
      return state;
  }
}

export default reducer;