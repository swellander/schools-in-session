import React from 'react';
import Student from './Student';
import { connect } from 'react-redux';

const SchoolDetail = (props) => {
  console.log(props);
  const { school } = props;
  console.log(school);
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
  console.log(schools.list.find(school => school.id == 1))
  return {
    school: schools.list.find(school => school.id == id)
  }
}

export default connect(mapStateToProps)(SchoolDetail);