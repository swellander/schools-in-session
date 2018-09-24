import React from 'react';

const Student = ({ student }) => {
  return (
    <div>
      <h3>
        {student.firstName}
      </h3>
      <p>
        <em>{student.school.name}</em>
      </p>
    </div>
  )
}

export default Student;