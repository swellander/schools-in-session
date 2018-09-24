import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { _deleteStudent } from '../store/student';

const StudentDetail = ({ student, remove }) => {
  if (!student) return <Redirect to="/schools" />
  return (
    <div>
      <h2>{student.firstName} {student.lastName}</h2>
      <p><em>{student.gpa}</em></p>
      <button onClick={() => remove(student.id)}>Delete</button>
    </div>
  )
}

const mapStateToProps = ({ students }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    student: students.list.find(student => student.id == id),
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    remove: id => {
      dispatch(_deleteStudent(id))
      history.push('/students')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);