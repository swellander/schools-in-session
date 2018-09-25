import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab, Tabs, Button, Typeography, AppBar, Toolbar, Typography } from '@material-ui/core/';

class NavBar extends React.Component {
  render() {
    const styles = {
      appBar: {
        flexWrap: 'wrap'
      }
    }
    return (
      <div>
        <AppBar position="static">
          {/* <Tabs>
            <Tab to="/schools" component={Link}>Schools</Tab>
            <Tab>Students</Tab>
          </Tabs> */}
          <Toolbar> <Typography varient="title" color="inherit">
          </Typography>

            <Button to="/students" component={Link}>
              Students ({this.props.students.list.length})
            </Button>

            <Button to="/schools" component={Link}>
              Schools ({this.props.schools.list.length})
            </Button>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = ({ schools, students }) => {
  return {
    schools,
    students
  }
}

export default connect(mapStateToProps)(NavBar);