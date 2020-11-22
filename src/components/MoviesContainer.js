// Library
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MovieContext } from "../Context/MovieContext";

// Style
import "../Styles/moviesContainer.scss";

// Components
import Movies from "./Movies";
import PreLoader from "./PreLoader";

function MoviesContainer() {
  const { movies } = useContext(MovieContext);

  return (
    <>
      <motion.div className="moviesContainer" exit={{ opacity: 0 }}>
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
            }}
          >
            <Movies key={movie.id} {...movie} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default MoviesContainer;
