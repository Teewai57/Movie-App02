import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import "./App.css"
import { useEffect } from "react";
import MovieListHeading from "./components/MovieListHeading"
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddFavorites";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8d7afd2`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);

    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }

    setMovies(responseJson.Search);
};


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
  <div className="container-fluid movie-app">
    <div className="row d-flex align-items-center mt-4 mb-4">
    <MovieListHeading heading="Movies"/>
    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className="row">
    <MovieList movies={movies} favoritesComponent={AddFavorite} />
    </div>
  </div>
  );
}

export default App;
