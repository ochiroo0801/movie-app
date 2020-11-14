import React, { useEffect } from "react";
import { useState } from "react";
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../config";
import PreLoader from "./PreLoader";
import "../Styles/moviePage.scss";

import { FaPlay } from "react-icons/fa";
import { BsBoxArrowLeft } from "react-icons/bs";
import { Link, Route } from "react-router-dom";
import Trailer from "./Trailer";
import { motion } from "framer-motion";

function MoviePage({ match }) {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovies(API_URL + "movie/" + match.params.id + "?api_key=" + API_KEY);
  }, []);

  const getMovies = (API) => {
    setLoading(true);
    fetch(API)
      .then((resp) => resp.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      });
  };

  const BACKDROP = IMAGE_BASE_URL + BACKDROP_SIZE + movies.backdrop_path;
  const POSTER = IMAGE_BASE_URL + POSTER_SIZE + movies.poster_path;
  const genres = movies.genres;

  const fadeUpFrom = {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  };

  const fadeUpTo = {
    y: 0,
    opacity: 1,
  };

  return (
    <>
      {loading === true ? <PreLoader /> : null}
      <Route path={"/movies/:id/trailer"} component={Trailer} />
      <Route>
        <div className="moviePage">
          <div
            className="moviePage__header"
            style={{ backgroundImage: `url(${BACKDROP})` }}
          >
            <div className="moviePage__wrapper">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="moviePage__header--posterIMG"
                style={{ backgroundImage: `url(${POSTER})` }}
              ></motion.div>
              <div className="moviePage__header--content">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Link to={"/movies"} className="back">
                    <BsBoxArrowLeft />
                    <h3>Back</h3>
                  </Link>
                </motion.div>
                <motion.h1
                  initial={fadeUpFrom}
                  animate={fadeUpTo}
                  transition={{ duration: 0.5 }}
                >
                  {movies.original_title}
                </motion.h1>
                <motion.div
                  className="details"
                  initial={fadeUpFrom}
                  animate={fadeUpTo}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p>{movies.release_date}</p>
                  {genres
                    ? genres.map((e) => (
                        <div className="genres" key={e.id}>
                          {e.name}
                        </div>
                      ))
                    : null}
                  <p className="runtime">{movies.runtime}m</p>
                </motion.div>
                <motion.div
                  className="moreTools"
                  initial={fadeUpFrom}
                  animate={fadeUpTo}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="vote">{movies.vote_average}</span>
                  <Link
                    className="playVideo"
                    to={"/movies/" + match.params.id + "/trailer"}
                  >
                    <FaPlay /> <h3>Play Trailer</h3>
                  </Link>
                </motion.div>
                <motion.p
                  initial={fadeUpFrom}
                  animate={fadeUpTo}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {movies.tagline}
                </motion.p>
                <motion.h3
                  initial={fadeUpFrom}
                  animate={fadeUpTo}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Overview
                </motion.h3>
                <motion.p
                  className="overView"
                  initial={fadeUpFrom}
                  animate={fadeUpTo}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {movies.overview}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </Route>
    </>
  );
}

export default MoviePage;
