import React from 'react';
import StudentTable from './StudentTable';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { _deleteSchool } from '../store/school';
import { Typography, Paper, Grid, Button, Divider } from '@material-ui/core';

const SchoolDetail = ({ user, students, school, remove }) => {
  const styles = {
    padding: 40,
    // backgroundImage: `url(${school.imageUrl})`
  }
  const containerStyles = {
    marginTop: 40
  }
  const btnStyles = {
    marginTop: 6
  }

  const auth = Boolean(user.id)

  if (!school) return <Redirect to="/schools" />
  return (
    <div style={containerStyles}>
      <Grid container justify="center">
        <Grid item xs={7}>
          <Paper>
            <div style={styles}>
              <Grid container>
                <Grid item xs={9}>
                  <Typography variant="display2">{school.name}</Typography>
                </Grid>

                {auth && (
                  <Grid item xs={3}>
                    <div style={btnStyles}>
                      <Button to={`/schools/${school.id}/update`} component={Link} variant="contained" color="primary">Update</Button>
                      <Button variant="contained" color="secondary" onClick={() => remove(school.id)}>Delete</Button>
                    </div>
                  </Grid>
                )}
              </Grid>

              <Typography variant="caption">
                <p><em>{school.address}</em></p>
              </Typography>

              <Typography>
                <p>{school.description}</p>
              </Typography>

              <Typography variant="headline">
                Students
              </Typography>
              <Divider />
              <br />

              <StudentTable detail={true} students={students} />
            </div>

          </Paper>
        </Grid>
      </Grid>
    </div >
  )
}

const mapStateToProps = ({ auth, schools, students }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    school: schools.list.find(school => school.id == id),
    students: students.list.filter(student => student.schoolId == id),
    user: auth
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