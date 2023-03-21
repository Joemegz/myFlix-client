import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

 
  // useEffect(() => {
  //   fetch("https://myflix2023.herokuapp.com/users/Josh")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("books from api:", data);
  //     });
  // }, []);
 
 
 
  useEffect(() => {
    fetch("https://myflix2023.herokuapp.com/movies") //fetching endpoint
      .then((response) => response.json()) //response parsed in json
      .then((data) => {
        console.log("data", data);
        //makes data usable
        const moviesFromApi = data.map((movie) => {
          //set variable to constant
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);
  // Passing an empty dependency array ([ ]) as a second argument to useEffect() tells React that your callback doesn’t depend on any value changes in props or state, so it never needs to rerun.

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};