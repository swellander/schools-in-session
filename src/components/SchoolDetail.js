import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SchoolDetail = ({ school }) => {
  if (!school) return <Redirect to="/schools" />
  return (
    <div>
      <h2>{school.name}</h2>
      <p><em>{school.address}</em></p>
      <p>{school.description}</p>
      <h3>Students</h3>
      <ul>
        {school.students.map(student => (
          <li key={student.id}>{student.firstName}</li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ schools }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    school: schools.list.find(school => school.id == id)
  }
}

export default connect(mapStateToProps)(SchoolDetail);