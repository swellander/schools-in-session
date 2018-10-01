import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab, Tabs, Button, Typeography, AppBar, Toolbar, Typography } from '@material-ui/core/';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt, value) {
    this.setState({ value })
  }
  componentDidMount() {
    //check if current url is students or schools
    if (this.props.location.pathname.includes('schools')) this.setState({ value: 0 })
    else this.setState({ value: 1 })
  }

  render() {
    const styles = {
      appBar: {
        flexWrap: 'wrap'
      }
    }
    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            centered
          >
            <Tab to="/schools" component={Link} label={`schools | ${this.props.schools.list.length}`} />
            <Tab to="/students" component={Link} label={`students | ${this.props.students.list.length}`} />
          </Tabs>

          {/* if user is logged in, show their name and a logout btn. else, show login btn */}
          {this.props.user.id ? <Button>Logout</Button> : <Button to="/login" component={Link}>Login</Button>}
        </AppBar>
      </div >
    )
  }
}

const mapStateToProps = ({ schools, students, auth }) => {
  return {
    user: auth,
    schools,
    students
  }
}

export default withRouter(connect(mapStateToProps)(NavBar));