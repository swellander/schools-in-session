import React from 'react';
import { connect } from 'react-redux';
import School from './School';

class Schools extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.schools.map(school => (
            <School key={school.id} school={school} />
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