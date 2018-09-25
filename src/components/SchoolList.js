import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import School from './School';
import { Grid } from '@material-ui/core';

class SchoolList extends React.Component {
  render() {
    const styles = {
      marginTop: '10vh',
      height: '90vh'
    }
    return (
      <Grid justify="center" container spacing={24} style={styles}>
        {this.props.schools.map(school => (
          <School key={school.id} school={school} />
        ))}
        <Link to="/schools/create">Create</Link>
      </Grid>
    )
  }
}

const mapStateToProps = ({ schools }) => {
  return {
    schools: schools.list
  }
}

export default connect(mapStateToProps)(SchoolList);