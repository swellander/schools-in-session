const SET_STUDENT = 'SET_STUDENT';

const setStudent = student => (
  {
    type: SET_STUDENT,
    student
  }
)

export default (state = {}, action) => {
  if (action.type == SET_STUDENT) {
    return action.student
  }
}