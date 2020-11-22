// Library
import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Styles
import "./App.scss";

// Components
import Header from "./components/Header";
import MoviePage from "./components/MoviePage";
import MoviesContainer from "./components/MoviesContainer";
import Pagination from "./components/Pagination";
import PreLoader from "./components/PreLoader";

// Context
import { MovieContext } from "./Context/MovieContext";

const App = () => {
  const {
    movies,
    search,
    page,
    loading,
    handlePageChange,
    handleOnSubmit,
    handleTakeValue,
  } = useContext(MovieContext);

  return (
    <div className="App">
      <Header
        handleOnSubmit={handleOnSubmit}
        handleTakeValue={handleTakeValue}
        search={search}
        movies={movies}
      />

      {loading === true ? <PreLoader /> : null}
      <Route
        render={({ location }) => (
          <AnimatePresence initial={true} exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route path="/movies/:id" component={MoviePage} />
              <Route path="/">
                <MoviesContainer movies={movies} />
                <Pagination handlePageChange={handlePageChange} page={page} />
              </Route>
            </Switch>
          </AnimatePresence>
        )}
      />
    </div>
  );
};

export default App;
