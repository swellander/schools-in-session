import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@material-ui/core';

const Student = ({ student }) => {
  return (
    <TableRow hover={true} to={`/students/${student.id}`} component={Link}>
      <TableCell>
        {student.firstName}
      </TableCell>
      <TableCell>
        {student.lastName}
      </TableCell>
      <TableCell>
        {student.gpa}
      </TableCell>
      <TableCell>
        {student.school.name}
      </TableCell>
    </TableRow>
  )
}

export default Student;