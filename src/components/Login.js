import React from 'react';
import { _loginUser } from '../store/auth';
import { connect } from 'react-redux';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: [e.target.value] })
  }
  render() {
    return (
      <Grid justify="center" container>
        <Grid item xs={7}>
          <Paper>
            <Grid container justify="center">
              <form onSubmit={this.handleSubmit}>
                <Grid item xs={9}>
                  <TextField
                    onChange={this.handleChange}
                    label="Username"
                    fullWidth={true}
                    name="userName"
                    value={this.state.userName}
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    onChange={this.handleChange}
                    label="Password"
                    fullWidth={true}
                    name="password"
                    value={this.state.password}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Button type="submit">Login</Button>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(_loginUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Login);