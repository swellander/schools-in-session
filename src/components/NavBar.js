import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Typeography, AppBar, Toolbar, Typography } from '@material-ui/core/';

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography varient="title" color="inherit">
              <NavLink to="/"><h1>Schooled</h1></NavLink>
            </Typography>

            <NavLink to="/students">
              <Button>Students ({this.props.students.list.length})</Button>
            </NavLink>

            <NavLink to="/schools">
              <Button>Schools ({this.props.schools.list.length})</Button>
            </NavLink>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = ({ schools, students }) => {
  return {
    schools,
    students
  }
}

export default connect(mapStateToProps)(NavBar);