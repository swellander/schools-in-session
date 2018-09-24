import React from 'react';
import NavBar from './NavBar';
import Schools from './Schools';
import Students from './Students';
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route path="/schools" component={Schools} />
          {/* <Route path="/students" component={Students} /> */}
        </Switch>
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

//withRouter because connect wrapper blocks location changes from causing rerenders of its children
//https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(connect(null, mapDispatchToProps)(Main));