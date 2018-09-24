import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _addStudent } from '../store/student';

class NewStudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.create(this.state)
    this.props.history.push('/students');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder="First Name" type="text" name="firstName" value={this.state.firstName} />
          <input onChange={this.handleChange} placeholder="Last Name" type="text" name="lastName" value={this.state.lastName} />
          <input onChange={this.handleChange} placeholder="GPA" type="text" name="gpa" value={this.state.gpa} />
          <select name="schoolId" onChange={this.handleChange}>
            <option>School</option>
            {this.props.schools.map(school => (
              <option value={school.id} key={school.id}>{school.name}</option>
            ))}
          </select>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ schools }, { history }) => {
  return {
    schools: schools.list,
    history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    create: student => dispatch(_addStudent(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStudentForm);