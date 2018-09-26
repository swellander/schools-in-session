import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';
import { Link } from 'react-router-dom';
import { Button, Paper, Grid, Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class StudentList extends React.Component {
  render() {
    const tableStyles = {
      width: '100%',
      overflowX: 'auto',
    }
    const btnStyles = {
      float: 'right',
      margin: 20
    }
    return (
      <div>
        <Button to="/students/create" component={Link} style={btnStyles} variant="fab" color="secondary" aria-label="Add" >
          <AddIcon />
        </Button>

        <Grid container justify="center">
          <Grid item xs={7}>
            <Paper>
              <Table style={tableStyles}>
                <TableHead>
                  <TableRow selected={true}>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>G.P.A</TableCell>
                    <TableCell>School</TableCell>
                  </TableRow>
                </TableHead>
                {this.props.students.map(student => (
                  <Student key={student.id} student={student} />
                ))}
              </Table>

            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ students }) => {
  return {
    students: students.list
  }
}

export default connect(mapStateToProps)(StudentList);