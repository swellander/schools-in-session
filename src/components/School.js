import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, CardContent, Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

class School extends React.Component {
  render() {
    const { school, classes } = this.props;
    return (
      <Grid item xs={12} lg={3}>
        <Card >
          <CardActionArea component={Link} to={`/schools/${school.id}`} className={classes.card} className={classes.action}>
            <CardMedia
              className={classes.media}
              image="http://lorempixel.com/400/200"
            />
            <CardContent>
              <Typography>
                {school.name}
              </Typography>
              <p>
                <em>{school.students.length}</em>
              </p>
            </CardContent>
          </CardActionArea>
        </Card >
      </Grid>
    )
  }
}

const styles = {
  card: {
    width: '20vw',
  },
  media: {
    height: 140,
  },
  action: {
    width: '100%'
  }
};

export default withStyles(styles)(School);