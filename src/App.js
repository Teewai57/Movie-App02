import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import "./App.css"
import { useEffect } from "react";
import MovieListHeading from "./components/MovieListHeading"
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [Favorites, setFavorites] = useState([]);


  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8d7afd2`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);

    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }
};


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const AddFavoriteMovie = (movie) => {
    const newFavoriteList = [...Favorites, movie];
    setFavorites(newFavoriteList);
  }

  

  return (
  <div className="container-fluid movie-app">
    <div className="row d-flex align-items-center mt-4 mb-4">
    <MovieListHeading heading="Movies"/>
    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className="row">
    <MovieList 
      movies={movies} 
      handleFavoritesClick={AddFavoriteMovie} 
      favoritesComponent={AddFavorite} 
    />
    </div>
    <div className="row d-flex align-items-center mt-4 mb-4">
    <MovieListHeading heading="Favorites"/>
    </div>
    <MovieList 
      movies={Favorites} 
      handleFavoritesClick={AddFavoriteMovie} 
      favoritesComponent={RemoveFavorites} 
    />
  </div>
  );
}

export default App;
