import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';
import { Link } from 'react-router-dom';

class StudentList extends React.Component {
  render() {
    console.log('this should be called')
    return (
      <div>
        <ul>
          {this.props.students.map(student => (
            <Student key={student.id} student={student} />
          ))}
        </ul>
        <Link to="/students/create">Create</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ students }) => {
  return {
    students: students.list
  }
}

export default connect(mapStateToProps)(StudentList);