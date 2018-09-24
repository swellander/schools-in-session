import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';

class Students extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.students.map(student => (
            <Student key={student.id} student={student} />
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ students }) => {
  return {
    students: students.list
  }
}

export default connect(mapStateToProps)(Students);