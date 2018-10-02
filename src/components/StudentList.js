import React from 'react';
import { connect } from 'react-redux';
import StudentTable from './StudentTable';
import { Link } from 'react-router-dom';
import { Button, Paper, Grid, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class StudentList extends React.Component {
  render() {
    const btnStyles = {
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
              <StudentTable students={this.props.students} />
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