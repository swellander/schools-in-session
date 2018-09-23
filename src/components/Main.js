import React from 'react';
import NavBar from './NavBar';
import { connect } from 'react-redux'
import { _loadSchools, } from '../store/school';
import { _loadStudents, } from '../store/student';

class Main extends React.Component {
  componentDidMount() {
    this.props.init();
  }
  render() {
    return (
      <div>
        <NavBar />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(_loadSchools())
      dispatch(_loadStudents())
    }
  }
};

export default connect(null, mapDispatchToProps)(Main);