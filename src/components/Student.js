import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@material-ui/core';

const Student = ({ student, detail }) => {
  const cleanLink = (props) => {
    console.log(props);
    return <Link to={props.to} style={{ textDecoration: 'none' }}></Link>
  }
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
      {detail ? '' :
        <TableCell>
          {student.school.name}
        </TableCell>
      }
    </TableRow>
  )
}

export default Student;