import React from 'react';
import { Link } from 'react-router-dom';

const Student = ({ student }) => {
  return (
    <div>
      <h3>
        <Link to={`/students/${student.id}`}>
          {student.firstName}
        </Link>
      </h3>
      <p>
        <em>{student.school ? student.school.name : 'No School'}</em>
      </p>
    </div>
  )
}

export default Student;