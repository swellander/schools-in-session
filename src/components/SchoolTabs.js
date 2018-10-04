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
    const props = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
    const { value } = this.state;
    return (
      <div>
        <Tabs
          value={value}
          onChange={this.handleChange}
        >
          <Tab label="Students" />
          <Tab label="Map" />
        </Tabs>
        {value === 0 && <StudentTable detail={true} students={this.props.students} />}
        {value === 1 && <Map center={props.center} zoom={props.zoom} />}
      </div>
    )
  }
}

const mapStateToProps = ({ students }, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    students: students.list.filter(student => student.schoolId == id),
  }
}

//QUESTION: when I need access to router props from a nested component that doesn't have direct access,
//what i

export default withRouter(connect(mapStateToProps)(SchoolTabs));