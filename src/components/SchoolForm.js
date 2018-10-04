import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _updateSchool, _addSchool } from '../store/school';
import { TextField, Typography, Paper, Grid, Button, Divider } from '@material-ui/core';
import LocationSearchInput from './LocationSearchInput';

class SchoolForm extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      address: '',
      description: '',
      imageUrl: '',
      lat: '',
      lng: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddressSelect = this.handleAddressSelect.bind(this);
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
  handleAddressSelect(addressObj) {
    this.setState({ ...addressObj }, () => console.log(this.state))
  }
  handleSubmit(e) {
    e.preventDefault();
    //either update or create
    if (this.props.school) {
      this.props.update(this.state);
    } else {
      this.props.create(this.state);
    }
    this.props.history.push(`/schools/${this.state.id}`)
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
      <div style={containerStyles}>
        <Grid container justify="center">
          <Grid item xs={7}>
            <Paper>
              <div style={styles}>
                <form onSubmit={this.handleSubmit}>
                  <Grid container>
                    <Grid item xs={9}>
                      <TextField
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <div style={btnStyles}>
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                        <Button variant="contained" color="secondary" onClick={() => remove(this.state.id)}>Delete</Button>
                      </div>
                    </Grid>
                  </Grid>

                  {/* <TextField
                    name="address"
                    label="Address"
                    value={this.state.address}
                    onChange={this.handleChange}
                    component={LocationSearchInput}
                  /> */}

                  <LocationSearchInput
                    selectAddress={this.handleAddressSelect}
                    initialAddress={this.state.address}
                  />

                  <TextField
                    multiline
                    fullWidth={true}
                    label="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />

                  <TextField
                    name="imageUrl"
                    fullWidth
                    label="Image URL"
                    value={this.state.imageUrl}
                    onChange={this.handleChange}
                  />

                </form>
              </div>

            </Paper>
          </Grid>
        </Grid >
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