import React from "react";
import { motion } from "framer-motion";
import "../Styles/movies.scss";

import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import { Link } from "react-router-dom";

function Movies({ poster_path, id }) {
  return (
    <Link to={"/movies/" + id}>
      <motion.div
        className="movies"
        whileHover={{ scale: 1.05, opacity: 0.8 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src={IMAGE_BASE_URL + POSTER_SIZE + poster_path} alt="" />
      </motion.div>
    </Link>
  );
}

export default Movies;
