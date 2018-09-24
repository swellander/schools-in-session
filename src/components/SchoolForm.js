import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _updateSchool, _addSchool } from '../store/school';

class SchoolForm extends Component {
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
  componentDidUpdate(prevProps) {
    //check to see if component is being used to update or create
    if (!prevProps.school && this.props.school) this.setState(this.props.school);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault();

    //either update or create
    if (this.props.school) {
      this.props.update(this.state);
      this.props.history.push('/schools')
    } else {
      this.props.create(this.state);
      this.props.history.push('/students');
    }
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
    create: school => dispatch(_addSchool(school)),
    update: school => dispatch(_updateSchool(school))
  }
}
const mapStateToProps = ({ schools }, { match }) => {
  const { id } = match.params;
  if (id) {
    return {
      school: schools.list.find(school => school.id == id)
    }
  } else {
    return {}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SchoolForm);