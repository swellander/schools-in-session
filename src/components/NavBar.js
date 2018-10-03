import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store/auth';
import { Tab, Tabs, Button, AppBar, Toolbar, Typography, Avatar, MenuItem, Menu, IconButton } from '@material-ui/core/';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      anchorEl: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(evt, value) {
    this.setState({ value })
  }
  componentDidMount() {
    //check if current url is students or schools
    if (this.props.location.pathname.includes('schools')) this.setState({ value: 0 })
    else this.setState({ value: 1 })
  }
  handleClose() {
    this.setState({ anchorEl: null })
  }
  handleMenu(e) {
    this.setState({ anchorEl: e.currentTarget })
  }
  logout() {
    this.props.logout();
  }
  render() {
    const styles = {
      appBar: {
        flexWrap: 'wrap'
      }
    }
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Tabs
              style={{ flexGrow: 1 }}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              centered
            >
              <Tab to="/schools" component={Link} label={`schools | ${this.props.schools.list.length}`} />
              <Tab to="/students" component={Link} label={`students | ${this.props.students.list.length}`} />
            </Tabs>

            {/* if user is logged in, show their name and a logout btn. else, show login btn */}
            {
              !this.props.user.id ?
                <Button variant="contained" to="/login" component={Link}>Login</Button> :
                (
                  <div>
                    <IconButton onClick={this.handleMenu}>
                      <Avatar
                        src={this.props.user.imageUrl}
                      />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem onClick={this.logout}>Logout</MenuItem>
                    </Menu>
                  </div>
                )
            }
          </Toolbar>
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
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    logout: () => dispatch(logoutUser(history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));