import React from 'react';
import { connect } from 'react-redux';

class Students extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.students.map(student => (
            <li key={student.id}>{student.firstName}</li>
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