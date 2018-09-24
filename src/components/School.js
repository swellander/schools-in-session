import React from 'react';
import { Link } from 'react-router-dom';

const School = ({ school }) => {
  return (
    <div>
      <h3>
        <Link to={`/schools/${school.id}`}>
          {school.name}
        </Link>
      </h3>
      <p>
        <em>{school.students.length}</em>
      </p>
    </div>
  )
}

export default School;