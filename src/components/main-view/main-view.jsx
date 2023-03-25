import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  



  useEffect(() => { 

    if (!token) {
      return;
    }

    fetch("https://myflix2023.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    }) //fetching endpoint
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
  }, [token]);
 
  if (!user) {
    console.log("testing")
    return (
      <>
      <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
      or
      <SignupView/>
      </>
    );
  }

  // Passing an empty dependency array  as a second argument to useEffect tells React that your callback doesn’t depend on any value changes in props or state, so it never needs to rerun.
<button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    return (
      <>
      <button
      onClick={() => {
        setUser(null);
      }}
      > 
      Logout
      </button>
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
      </>
    );
  }

  if (movies.length === 0) {
    return ( 
      <>
      <button
      onClick={() => {
        setUser(null);
      }}
      > 
      Logout
      </button>
    <div>The list is empty!</div>;
    </>
    );
  }

  return (
    <div>
      <button
      onClick={() => {
        setUser(null);
      }}
      > 
      Logout
      </button>
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