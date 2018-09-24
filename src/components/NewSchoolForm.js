import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _addSchool } from '../store/school';

class NewStudentForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: ''
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
          <input onChange={this.handleChange} placeholder="Name" type="text" name="name" value={this.state.name} />
          <input onChange={this.handleChange} placeholder="Address" type="text" name="address" value={this.state.address} />
          <textarea rows="7" columns="40" onChange={this.handleChange} placeholder="Description" type="text" name="description" value={this.state.description} />
          <button>Create</button>
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    create: school => dispatch(_addSchool(school))
  }
}

export default connect(null, mapDispatchToProps)(NewStudentForm);