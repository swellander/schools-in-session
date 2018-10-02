import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import School from './School';
import { Grid, Button, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class SchoolList extends React.Component {
  render() {
    const styles = {
      height: '90vh'
    }
    const btnStyles = {
      margin: 20,
    }
    return (
      <div>
        <Button to="/schools/create" component={Link} style={btnStyles} variant="fab" color="secondary" aria-label="Add" >
          <AddIcon />
        </Button>
        <Grid justify="center" container style={styles} spacing={24}>
          <Grid justify="center" item lg={10} container spacing={24}>
            {this.props.schools.map(school => (
              <School key={school.id} school={school} />
            ))}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ schools }) => {
  return {
    schools: schools.list
  }
}

export default connect(mapStateToProps)(SchoolList);