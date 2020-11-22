import React, { useContext, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { BsBoxArrowLeft } from "react-icons/bs";

import {
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  API_URL,
  API_KEY,
} from "../config";

import "../Styles/moviePage.scss";

import { MovieContext } from "../Context/MovieContext";

import Trailer from "./Trailer";
import PreLoader from "./PreLoader";

function MoviePage({ match }) {
  const { loading, setLoading, setMovie, movie } = useContext(MovieContext);

  const BACKDROP = IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path;
  const POSTER = IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path;
  const genres = movie.genres;

  useEffect(() => {
    getPageId(API_URL + "movie/" + match.params.id + "?api_key=" + API_KEY);
  }, []);

  const getPageId = (API) => {
    setLoading(true);
    fetch(API)
      .then((resp) => resp.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div exit={{ opacity: 0 }}>
      <Route path={"/movies/:id/trailer"} component={Trailer} />
      <Route>
        <div className="moviePage">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
            className="moviePage__header"
            style={{ backgroundImage: `url(${BACKDROP})` }}
          >
            {loading === true ? <PreLoader /> : null}
            <div className="moviePage__wrapper">
              <motion.div
                initial={{ opacity: 0, scale: 2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                }}
                className="moviePage__header--posterIMG"
                style={{ backgroundImage: `url(${POSTER})` }}
              ></motion.div>
              <motion.div
                className="moviePage__header--content"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <div>
                  <Link to="/" className="back">
                    <BsBoxArrowLeft />
                    <h3>Back</h3>
                  </Link>
                </div>
                <motion.h1 variants={item}>{movie.original_title}</motion.h1>
                <motion.div className="details" variants={item}>
                  <p>{movie.release_date}</p>
                  {genres
                    ? genres.map((e) => (
                        <div className="genres" key={e.id}>
                          {e.name}
                        </div>
                      ))
                    : null}
                  <p className="runtime">{movie.runtime}m</p>
                </motion.div>
                <motion.div className="moreTools" variants={item}>
                  <span className="vote">{movie.vote_average}</span>
                  <Link
                    className="playVideo"
                    to={"/movies/" + match.params.id + "/trailer"}
                  >
                    <FaPlay /> <h3>Play Trailer</h3>
                  </Link>
                </motion.div>
                <motion.p variants={item}>{movie.tagline}</motion.p>
                <motion.h3 variants={item}>Overview</motion.h3>
                <motion.p className="overView" variants={item}>
                  {movie.overview}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Route>
    </motion.div>
  );
}

export default MoviePage;
