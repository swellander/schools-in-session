import axios from 'axios';
import { _loadSchools } from './school';


const initialState = {
  list: []
}

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_SCHOOL = 'DELETE_SCHOOL';

const loadStudents = students => ({ type: LOAD_STUDENTS, students });
const addStudent = student => ({ type: ADD_STUDENT, student });
const deleteStudent = id => ({ type: DELETE_STUDENT, id });
const updateStudent = student => ({ type: UPDATE_STUDENT, student });

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
export const _updateStudent = student => dispatch => (
  axios.put('/api/students', student)
    .then(response => response.data)
    .then(updatedStudent => {
      dispatch(updateStudent(updatedStudent))
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
      return { ...state, list: [action.student, ...state.list] }
    case DELETE_STUDENT:
      return { ...state, list: state.list.filter(student => student.id !== action.id) }
    case UPDATE_STUDENT:
      const filteredList = state.list.filter(student => student.id !== action.student.id);
      return { ...state, list: [...filteredList, action.student] }
    case DELETE_SCHOOL:
      const updatedStudents = state.list.map(student => {
        if (student.schoolId == action.id) return { ...student, schoolId: null }
        return student
      });
      return { ...state, list: updatedStudents }
    default:
      return state;
  }
}

export default reducer;