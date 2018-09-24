import React from 'react';
import NavBar from './NavBar';
import SchoolList from './SchoolList';
import SchoolDetail from './SchoolDetail';
import SchoolForm from './SchoolForm';
import StudentList from './StudentList';
import StudentDetail from './StudentDetail';
import StudentForm from './StudentForm';
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
          <Route exact path="/schools" component={SchoolList} />
          <Route path="/schools/create" component={SchoolForm} />
          {/* TODO: QUESTION: research best practice for id and update paths */}
          <Route exact path="/schools/:id" component={SchoolDetail} />
          <Route path="/schools/:id/update" component={SchoolForm} />
          <Route exact path="/students" component={StudentList} />
          <Route path="/students/create" component={StudentForm} />
          <Route exact path="/students/:id" component={StudentDetail} />
          <Route path="/students/:id/update" component={StudentForm} />
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