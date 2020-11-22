import React, { useState, useEffect, createContext } from "react";
import { API_URL, API_KEY, SEARCH } from "../config";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState({});

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
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        movie,
        setMovie,
        search,
        setSearch,
        page,
        setPage,
        loading,
        setLoading,
        trailer,
        setTrailer,
        handlePageChange,
        handleOnSubmit,
        handleTakeValue,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
