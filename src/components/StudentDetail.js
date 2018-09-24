import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const StudentDetail = ({ student }) => {
  if (!student) return <Redirect to="/schools" />
  return (
    <div>
      <h2>{student.firstName} {student.lastName}</h2>
      <p><em>{student.gpa}</em></p>
    </div>
  )
}

const mapStateToProps = ({ students }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    student: students.list.find(student => student.id == id)
  }
}

export default connect(mapStateToProps)(StudentDetail);