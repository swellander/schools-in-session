import React from 'react';
import { connect } from 'react-redux';

class Schools extends React.Component {
  render() {
    console.log("HEY")
    return (
      <div>
        <h1>Schools</h1>
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