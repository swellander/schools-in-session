import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { _deleteStudent } from '../store/student';
import { Paper, Grid, Avatar } from '@material-ui/core';

const StudentDetail = ({ student, remove }) => {
  if (!student) return <Redirect to="/schools" />
  const avatarStyles = {
    width: 200,
    height: 200
  }
  return (
    <div>

      <Grid justify="center" container>
        <Grid item xs={4}>
          <Paper>
            <Avatar
              style={avatarStyles}
              src={student.imageUrl}
              alt={student.name}
            />
            <h2>{student.firstName} {student.lastName}</h2>
            {/* <img src={student.imageUrl} /> */}
            <p><em>{student.gpa}</em></p>
            <button><Link to={`/students/${student.id}/update`}>Update</Link></button>
            <button onClick={() => remove(student.id)}>Delete</button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = ({ students }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    student: students.list.find(student => student.id == id),
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