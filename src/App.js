import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import MoviePage from "./components/MoviePage";
import MoviesContainer from "./components/MoviesContainer";
import Pagination from "./components/Pagination";
import PreLoader from "./components/PreLoader";
import { API_URL, API_KEY, SEARCH } from "./config";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovies(API_URL + "movie/popular?api_key=" + API_KEY + "&page=" + page);
  }, [page]);

  const getMovies = (API) => {
    setLoading(true);
    fetch(API)
      .then((resp) => resp.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      });
  };

  const handlePageChange = (e) => {
    if (e === "next") {
      setPage(page + 1);
    } else {
      if (page !== 1) {
        setPage(page - 1);
      }
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (search) {
      getMovies(SEARCH + search);

      setSearch("");
    }
  };

  const handleTakeValue = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <Header
        handleOnSubmit={handleOnSubmit}
        handleTakeValue={handleTakeValue}
        search={search}
        movies={movies}
      />

      {loading === true ? <PreLoader /> : null}

      <Switch>
        <Route path="/movies/:id" component={MoviePage} />
        <Route path="/">
          <MoviesContainer movies={movies} />
          <Pagination handlePageChange={handlePageChange} page={page} />
        </Route>
      </Switch>
    </div>
  );
};

export { App };
