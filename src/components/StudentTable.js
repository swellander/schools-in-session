import React from 'react';
import Student from './Student';
import { Table, TableHead, TableRow, TableCell } from '@material-ui/core'

const StudentTable = (props) => {
  const tableStyles = {
    width: '100%',
    overflowX: 'auto',
  }
  return (
    <Table style={tableStyles}>
      <TableHead>
        <TableRow selected={true}>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>G.P.A</TableCell>
          {props.detail ? '' : <TableCell>School</TableCell>}
        </TableRow>
      </TableHead>
      {props.students.map(student => (
        <Student key={student.id} detail={props.detail} student={student} />
      ))}
    </Table>
  )
}

export default StudentTable;