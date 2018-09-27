import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _updateStudent, _addStudent } from '../store/student';
import { Select, MenuItem, TextField, Button, Typography, Paper, Grid, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

class StudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: '',
      imageUrl: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { student } = this.props;
    //check to see if component is being used to update or create
    if (student) this.setState(student);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(e.target.value)
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.student) {
      this.props.update(this.state);
    } else {
      this.props.create(this.state)
    }
    this.props.history.push('/students/${this.state}');
  }
  render() {
    const avatarStyles = {
      width: 200,
      height: 200,
      margin: 20
    }
    const styles = {
      marginTop: '10vh'
    }
    console.log(this.state);
    return (
      <div style={styles}>
        <Grid justify="center" container>
          <Grid item xs={4}>
            <Paper>
              <Grid container justify="center">
                <Grid item>
                  <Avatar
                    style={avatarStyles}
                    src={this.state.imageUrl}
                    alt={this.state.firstName}
                  />
                </Grid>
              </Grid>
              <form onSubmit={this.handleSubmit}>
                <Grid justify="center" spacing={8} container>

                  {/* first row */}

                  <Grid align="center" item xs={7}>
                    <Typography>
                      <TextField
                        id="standard-name"
                        label="First Name"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        margin="normal"
                      />
                      <TextField
                        id="standard-name"
                        label="Lase Name"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        margin="normal"
                      />
                    </Typography>
                  </Grid>

                  {/* second row */}
                  <Grid align="center" item xs={7}>
                    <TextField
                      label="GPA"
                      value={this.state.gpa}
                      name="gpa"
                      onChange={this.handleChange}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </Grid>
                  {/* third row */}

                  <Grid align="center" item xs={7}>
                    <Select
                      name="schoolId"
                      value={this.state.schoolId}
                      onChange={this.handleChange}
                      label="School"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.props.schools.map(school => (
                        <MenuItem
                          value={school.id}
                          key={school.id}>
                          {school.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                </Grid>

                <Grid justify="center" container spacing={24}>
                  <Grid align="center" item xs={3}>
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                  </Grid>
                  <Grid align="center" item xs={3}>
                    <Button variant="contained" color="secondary" onClick={() => remove(student.id)}>Delete</Button>
                  </Grid>
                </Grid>

              </form>
            </Paper>
          </Grid>
        </Grid>
      </div >
    )
  }
}

const mapStateToProps = ({ schools, students }, ownProps) => {
  const { history, match } = ownProps;
  let props = {
    schools: schools.list,
    history
  }
  //check to see if form is being used to create or update
  const { id } = match.params;
  if (id) props = { ...props, student: students.list.find(student => student.id == id) }

  return props;
}

const mapDispatchToProps = dispatch => {
  return {
    create: student => dispatch(_addStudent(student)),
    update: student => dispatch(_updateStudent(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);