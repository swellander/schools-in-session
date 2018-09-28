import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab, Tabs, Button, Typeography, AppBar, Toolbar, Typography } from '@material-ui/core/';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt, value) {
    this.setState({ value })
  }

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
          {/* <Toolbar> <Typography varient="title" color="inherit">
          </Typography>

            <Button color="default" to="/students" component={Link}>
              Students ({this.props.students.list.length})
            </Button>

            <Button color="default" to="/schools" component={Link}>
              Schools ({this.props.schools.list.length})
            </Button> */}

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            centered
          >
            <Tab to="/schools" component={Link} label="schools" />
            <Tab to="/students" component={Link} label="students" />
          </Tabs>

          {/* </Toolbar> */}
        </AppBar>
      </div >
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