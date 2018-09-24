import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    console.log(this.state);
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

const mapStateToProps = ({ schools }) => {
  return {
    schools: schools.list
  }
}

export default connect(mapStateToProps)(NewStudentForm);