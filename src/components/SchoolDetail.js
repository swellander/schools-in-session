import React from 'react';
import StudentTable from './StudentTable';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { _deleteSchool } from '../store/school';
import { Paper, Grid, Button } from '@material-ui/core';

const SchoolDetail = ({ students, school, remove }) => {
  const styles = {
    padding: 40
  }
  const containerStyles = {
    marginTop: 40
  }
  const btnStyles = {
    marginTop: 18
  }

  if (!school) return <Redirect to="/schools" />
  return (
    <div style={containerStyles}>
      <Grid container justify="center">
        <Grid item xs={7}>
          <Paper>
            <div style={styles}>
              <Grid container>
                <Grid item xs={9}>
                  <h2>{school.name}</h2>
                </Grid>
                <Grid item xs={3}>
                  <div style={btnStyles}>
                    <Button variant="contained" color="primary"><Link to={`/schools/${school.id}/update`}>Update</Link></Button>
                    <Button variant="contained" color="secondary" onClick={() => remove(school.id)}>Delete</Button>
                  </div>
                </Grid>
              </Grid>
              <p><em>{school.address}</em></p>
              <p>{school.description}</p>
              <h3>Students</h3>
              <StudentTable students={students} />
            </div>

          </Paper>
        </Grid>
      </Grid>
    </div >
  )
}

const mapStateToProps = ({ schools, students }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    school: schools.list.find(school => school.id == id),
    students: students.list.filter(student => student.school.id == id)
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    remove: id => {
      dispatch(_deleteSchool(id));
      history.push('/schools');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetail);