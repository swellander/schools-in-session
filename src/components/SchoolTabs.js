import React, { Component } from 'react';
import StudentTable from './StudentTable';
import Map from './Map';
import { Tabs, Tab, } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SchoolTabs extends Component {
  constructor() {
    super();
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, value) {
    this.setState({ value })
  }
  render() {
    const { value } = this.state;
    const { students, school } = this.props;
    const { lat, lng } = school;
    return (
      <div>
        <Tabs
          value={value}
          onChange={this.handleChange}
        >
          <Tab label="Students" />
          <Tab label="Map" />
        </Tabs>
        {value === 0 && <StudentTable detail={true} students={students} />}
        {value === 1 && <Map center={{ lat, lng }} zoom={11} />}
      </div>
    )
  }
}

const mapStateToProps = ({ students, schools }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    students: students.list.filter(student => student.schoolId == id),
    school: schools.list.find(school => school.id == id),
  }
}

//QUESTION: when I need access to router props from a nested component that doesn't have direct access,
//what i

export default withRouter(connect(mapStateToProps)(SchoolTabs));