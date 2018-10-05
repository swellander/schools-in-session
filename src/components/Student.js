import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@material-ui/core';

const Student = ({ student, detail }) => {
  return (
    <TableRow style={{ textDecoration: 'none' }} hover={true} to={`/students/${student.id}`} component={Link}>
      <TableCell>
        {student.firstName}
      </TableCell>
      <TableCell>
        {student.lastName}
      </TableCell>
      <TableCell>
        {student.gpa}
      </TableCell>
      {detail ? '' :
        <TableCell>
          {student.school ? student.school.name : 'N/A'}
        </TableCell>
      }
    </TableRow>
  )
}

export default Student;