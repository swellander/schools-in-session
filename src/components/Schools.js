import React from 'react';
import { connect } from 'react-redux';

class Schools extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.schools.map(school => (
            <li key={school.id}>{school.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ schools }) => {
  return {
    schools: schools.list
  }
}

export default connect(mapStateToProps)(Schools);