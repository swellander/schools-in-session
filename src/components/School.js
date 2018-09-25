import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, CardContent, Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const School = ({ school, classes }) => {
  return (
    <Grid item xs={12} lg={3}>
      <Card className={classes.card}>
        <CardActionArea className={classes.action}>
          <CardMedia
            className={classes.media}
            image="http://lorempixel.com/400/200"
          />
          <CardContent>
            <Typography component={Link} to={`/schools/${school.id}`}>
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