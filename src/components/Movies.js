import React from "react";
import "../Styles/movies.scss";

import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import { Link } from "react-router-dom";

function Movies({ poster_path, id }) {
  return (
    <Link to={"/movies/" + id}>
      <div className="movies">
        <img src={IMAGE_BASE_URL + POSTER_SIZE + poster_path} alt="" />
      </div>
    </Link>
  );
}

export default Movies;
