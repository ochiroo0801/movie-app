import React, { useState, useEffect, useContext } from "react";
import "../Styles/trailer.scss";
import { API_KEY, API_URL } from "../config";
import ReactPlayer from "react-player/lazy";
import PreLoader from "./PreLoader";
import { Link } from "react-router-dom";
import { MovieContext } from "../Context/MovieContext";

function Trailer({ match }) {
  const { trailer, setTrailer, setLoading, loading } = useContext(MovieContext);

  const id = match.params.id;
  const youtubeUrl = trailer[0];

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}movie/${id}/videos?api_key=${API_KEY}`)
      .then((resp) => resp.json())
      .then((data) => {
        setTrailer(data.results);
        setLoading(false);
      });
  }, [id]);

  return (
    <Link to={"/movies/" + match.params.id} className="trailerContainer">
      {loading === true ? <PreLoader /> : null}

      <ReactPlayer
        className="player"
        url={`https://www.youtube.com/watch?v=${
          youtubeUrl ? youtubeUrl.key : null
        } `}
      />
    </Link>
  );
}

export default Trailer;
