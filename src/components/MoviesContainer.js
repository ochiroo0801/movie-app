// Library
import React from "react";
import { motion } from "framer-motion";

// Style
import "../Styles/moviesContainer.scss";

// Components
import Movies from "./Movies";

function MoviesContainer({ movies }) {
  return (
    <>
      <motion.div className="moviesContainer">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, opacity: 0.8 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Movies key={movie.id} {...movie} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default MoviesContainer;
