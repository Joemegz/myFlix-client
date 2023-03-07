import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
      title: "Inception",
      Description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
      Genre: "Thriller",
      Director: "Christopher Nolan"
    },
    {
      id: 2,
      image:
        "https://static.wikia.nocookie.net/xmenmovies/images/b/bb/488e8de605ef4589b9515e3a759cf867.jpg",
      title: "Logan",
      Description:
        "In a future where mutants are nearly extinct, an elderly and weary Logan leads a quiet life. But when Laura, a mutant child pursued by scientists, comes to him for help, he must get her to safety.",
      Genre: "Action",
      Director: "James Mangold"
    },
    {
      id: 3,
      image:
        "https://static.wikia.nocookie.net/marvelmovies/images/b/b9/Deadpool.jpg",
      title: "Deadpool",
      Description:
        "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
      Genre: "Action",
      Director: "Tim Miller"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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