import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { _deleteStudent } from '../store/student';
import { Button, Typography, Paper, Grid, Avatar } from '@material-ui/core';

const StudentDetail = ({ user, student, remove }) => {
  if (!student) return <Redirect to="/schools" />
  const avatarStyles = {
    width: 200,
    height: 200,
    margin: 20
  }
  const styles = {
    marginTop: '10vh'
  }
  console.log(student);
  return (
    <div style={styles}>

      <Grid justify="center" container>
        <Grid item xs={4}>
          <Paper>
            <Grid container justify="center">
              <Grid item>
                <Avatar
                  style={avatarStyles}
                  src={student.imageUrl}
                  alt={student.name}
                />
              </Grid>
            </Grid>
            <Grid spacing={8} container>

              {/* first row */}
              <Grid item xs={5}>
                <Typography variant="subheading" align="right">
                  Name:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography>
                  {student.firstName} {student.lastName}
                </Typography>
              </Grid>

              {/* second row */}
              <Grid item xs={5}>
                <Typography variant="subheading" align="right">
                  GPA:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography>
                  {student.gpa}
                </Typography>
              </Grid>
              {/* third row */}
              <Grid item xs={5}>
                <Typography variant="subheading" align="right">
                  School:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography to={`/schools/${student.schoolId}`} component={Link}>
                  {student.school ? student.school.name : 'N/A'}
                </Typography>
              </Grid>
            </Grid>

            {user.id == student.id && (
              <Grid justify="center" container spacing={24}>
                <Grid align="center" item xs={3}>
                  <Button to={`/students/${student.id}/update`} component={Link} variant="contained" color="primary">Update</Button>
                </Grid>
                <Grid align="center" item xs={3}>
                  <Button variant="contained" color="secondary" onClick={() => remove(student.id)}>Delete</Button>
                </Grid>
              </Grid>
            )}

          </Paper>
        </Grid>
      </Grid>
    </div >
  )
}

const mapStateToProps = ({ students, auth }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    student: students.list.find(student => student.id == id),
    user: auth
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    remove: id => {
      dispatch(_deleteStudent(id))
      history.push('/students')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);