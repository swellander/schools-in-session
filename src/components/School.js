import React from 'react';

const School = ({ school }) => {
  return (
    <div>
      <h3>
        {school.name}
      </h3>
      <p>
        <em>{school.students.length}</em>
      </p>
    </div>
  )
}

export default School;