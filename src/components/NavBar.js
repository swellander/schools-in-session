import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/"><h1>Schooled</h1></NavLink>
        <NavLink to="/schools">Schools: {this.props.schools.list.length}</NavLink>
        <br></br>
        <NavLink to="/students">Students: {this.props.students.list.length}</NavLink>
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