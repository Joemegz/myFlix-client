import React from "react";
import PropTypes from "prop-types"; //imports the prop-type library
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return ( 
    <Card className="h-100">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button className="movieButton" variant="Link">
      <Card.Img variant="top" src={movie.image} />
          <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        </Card.Body>   
        </Button>
      </Link>
      
    </Card>
  );
  };

//where we define all the props constraints for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired})
};