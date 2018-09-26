import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { _deleteSchool } from '../store/school';
import { Paper, Grid } from '@material-ui/core';

const SchoolDetail = ({ school, remove }) => {
  const styles = {
    padding: 20
  }

  if (!school) return <Redirect to="/schools" />
  return (
    <Grid container justify="center">
      <Grid xs={7}>
        <Paper>
          <div style={styles}>
            <h2>{school.name}</h2>
            <p><em>{school.address}</em></p>
            <p>{school.description}</p>
            <h3>Students</h3>
            <ul>
              {school.students.map(student => (
                <li key={student.id}>{student.firstName + ' ' + student.lastName}</li>
              ))}
            </ul>
            <button><Link to={`/schools/${school.id}/update`}>Update</Link></button>
            <button onClick={() => remove(school.id)}>Delete</button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ schools }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    school: schools.list.find(school => school.id == id)
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