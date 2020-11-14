import React from "react";
import { useLocation } from "react-router-dom";
import "../Styles/header.scss";

import { LOGO } from "../config";
import { Link } from "react-router-dom";

function Header({ handleOnSubmit, handleTakeValue, search }) {
  const location = useLocation();

  console.log(location.pathname !== "/movies/741067");

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={LOGO} alt="" />
      </Link>

      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleTakeValue}
          value={search}
        />
      </form>
    </div>
  );
}

export default Header;
