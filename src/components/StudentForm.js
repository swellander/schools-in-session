import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _updateStudent, _addStudent } from '../store/student';

class StudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { student } = this.props;
    //check to see if component is being used to update or create
    if (student) this.setState(student);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.student) {
      this.props.update(this.state);
    } else {
      this.props.create(this.state)
    }
    this.props.history.push('/students');
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder="First Name" type="text" name="firstName" value={this.state.firstName} />
          <input onChange={this.handleChange} placeholder="Last Name" type="text" name="lastName" value={this.state.lastName} />
          <input onChange={this.handleChange} placeholder="GPA" type="text" name="gpa" value={this.state.gpa} />
          <select value={this.props.schoolId} name="schoolId" onChange={this.handleChange}>
            <option>School</option>
            {this.props.schools.map(school => (
              <option
                value={school.id}
                key={school.id}>
                {school.name}
              </option>
            ))}
          </select>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ schools, students }, ownProps) => {
  const { history, match } = ownProps;
  let props = {
    schools: schools.list,
    history
  }
  //check to see if form is being used to create or update
  const { id } = match.params;
  if (id) props = { ...props, student: students.list.find(student => student.id == id) }

  return props;
}

const mapDispatchToProps = dispatch => {
  return {
    create: student => dispatch(_addStudent(student)),
    update: student => dispatch(_updateStudent(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);