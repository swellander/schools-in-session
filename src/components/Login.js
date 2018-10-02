import React from 'react';
import { _loginUser } from '../store/auth';
import { connect } from 'react-redux';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';

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
    const styles = {
      marginTop: '10vh'
    }
    return (
      <div style={styles}>
        <Grid justify="center" container>
          <Grid item xs={4}>
            <Paper>
              <form onSubmit={this.handleSubmit}>
                <Grid container justify="center">
                  <Grid container justify="center" item xs={12}>
                    <Grid item xs={4}>
                      <AccountBox style={{ fontSize: 150 }} />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container justify='center'>
                    <Grid container justify="center" item xs={4}>
                      <Grid item xs={12}>
                        <TextField
                          onChange={this.handleChange}
                          label="Username"
                          fullWidth={true}
                          name="userName"
                          value={this.state.userName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type='password'
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
                    </Grid>
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

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    login: user => dispatch(_loginUser(user, history))
  }
}

export default connect(null, mapDispatchToProps)(Login);