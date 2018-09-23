import axios from 'axios';

const initialState = {
  list: []
}

const LOAD_STUDENTS = 'LOAD_STUDENTS';

const loadStudents = students => ({ type: LOAD_STUDENTS, students });

export const _loadStudents = () => dispatch => (
  axios.get('/api/students')
    .then(response => response.data)
    .then(students => dispatch(loadStudents(students)))
    .catch(err => {
      alert(err);
    })
)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return { ...state, list: action.students }
    default:
      return state;
  }
}

export default reducer;