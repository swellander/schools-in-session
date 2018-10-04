import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

class HomePage extends Component {
  render() {
    const styles = {
      marginTop: '10vh'
    }
    const { user } = this.props;
    return (
      <div style={styles}>
        <Grid container justify="center">
          <Grid justify="center" item xs={8}>
            <Typography variant="display4">
              {
                user.id ?
                  `Welcome, ${user.firstName}!` :
                  'Welcome!'
              }
            </Typography>
            <hr></hr>
            {user.id && (
              <Typography variant="display1">
                Create a student and login to edit/delete
            </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth
  }
}

export default connect(mapStateToProps)(HomePage);