import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { findDOMNode } from 'react-dom';

const getAuthorNames = (authors, allAuthors) => {
  if (!authors) {
    return ''
  }
  return authors.split(',')
    .map(email => find(allAuthors, author => author.email === email))
    .reduce((value, result) => {
      return `${result}, ${value.lastname ? value.lastname.toUpperCase() : ''} ${value.firstname ? value.firstname.toUpperCase(): ''}`;
    }, '');
}

const BookOrMagazine = ({ classes = {}, data, authors: allAuthors }) => {
  const authorName = getAuthorNames(data.authors, allAuthors);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {data.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {data.description}
        </Typography>
        <Typography variant="body2" component="p">
          Author/s details:-
          {authorName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookOrMagazine;