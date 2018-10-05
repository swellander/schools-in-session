import React from 'react';
import SchoolTabs from './SchoolTabs';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { _deleteSchool } from '../store/school';
import { Typography, Paper, Grid, Button, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

class SchoolDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleClose() {
    this.setState({ open: false })
  }
  handleOpen() {
    this.setState({ open: true })
  }
  handleRemove() {
    this.props.remove(this.props.school.id);
    this.handleClose();
  }
  render() {
    const { user, students, school, remove } = this.props;
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
                        <Button variant="contained" color="secondary" onClick={this.handleOpen}>Delete</Button>
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

                <br />
                <Divider />

                {/* Student list and Map */}
                <br />
                <SchoolTabs />
              </div>

            </Paper>
          </Grid>
        </Grid>

        {/* Modal.....Maybe make a separate component? This one is getting pretty loooooong */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Are you sure?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Deleting ${school.name} would mean depriving ${school.students.length} ${school.students.length === 1 ? 'student' : 'students'} of a quality education. ${school.students.length > 2 ? (
                `Think of ${school.students[0].firstName} and ${school.students[1].firstName}. Take a good long look at ${school.students[2].firstName} ${school.students[2].lastName}'s goofy cartoon profile picture and then make your decision.`
              ) : (
                  `Well, actually, there really aren't that many students that would be affected by this destructive decision. Delete away.`
                )}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRemove} color="secondary">
              Delete
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Save the Children
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }

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