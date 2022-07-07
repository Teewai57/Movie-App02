import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import "./App.css"
import { useEffect } from "react";
import MovieListHeading from "./components/MovieListHeading"


function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = 'http://www.omdbapi.com/?s=star wars&apikey=8d7afd2';
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);

    setMovies(responseJson.Search);
};


  useEffect(() => {
    getMovieRequest();
  }, []);

  return (
  <div className="container-fluid movie-app">
    <div className="row">
    <MovieListHeading />
    </div>
    <div className="row">
    <MovieList movies={movies}  />
    </div>
  </div>
  );
}

export default App;
