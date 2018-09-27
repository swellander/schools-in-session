import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _updateSchool, _addSchool } from '../store/school';
import { Typography, Paper, Grid, Button, Divider } from '@material-ui/core';

class SchoolForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { school } = this.props;
    //check to see if component is being used to update or create
    if (school) this.setState(school);
  }
  componentDidUpdate(prevProps) {
    const { school } = this.props;
    if (school && !prevProps.school) this.setState(school)
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault();

    //either update or create
    if (this.props.school) {
      this.props.update(this.state);
    } else {
      this.props.create(this.state);
    }
    this.props.history.push('/schools')
  }
  render() {
    const styles = {
      padding: 40
    }
    const containerStyles = {
      marginTop: 40
    }
    const btnStyles = {
      marginTop: 18
    }
    return (
      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <input onChange={this.handleChange} placeholder="Name" type="text" name="name" value={this.state.name} />
      //     <input onChange={this.handleChange} placeholder="Address" type="text" name="address" value={this.state.address} />
      //     <textarea rows="7" columns="40" onChange={this.handleChange} placeholder="Description" type="text" name="description" value={this.state.description} />
      //     <button>Create</button>
      //   </form>
      // </div>
      <div style={containerStyles}>
        <Grid container justify="center">
          <Grid item xs={7}>
            <Paper>
              <div style={styles}>
                <Grid container>
                  <Grid item xs={9}>
                    <Typography variant="display2">{school.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <div style={btnStyles}>
                      <Button variant="contained" color="primary"><Link to={`/schools/${school.id}/update`}>Update</Link></Button>
                      <Button variant="contained" color="secondary" onClick={() => remove(school.id)}>Delete</Button>
                    </div>
                  </Grid>
                </Grid>

                <Typography variant="caption">
                  <p><em>{school.address}</em></p>
                </Typography>

                <Typography>
                  <p>{school.description}</p>
                </Typography>
              </div>

            </Paper>
          </Grid>
        </Grid>
      </div >
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    create: school => dispatch(_addSchool(school)),
    update: school => dispatch(_updateSchool(school))
  }
}
const mapStateToProps = ({ schools }, { match }) => {
  const { id } = match.params;
  if (id) {
    return {
      school: schools.list.find(school => school.id == id)
    }
  } else {
    return {}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SchoolForm);