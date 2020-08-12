import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import MovieDescription from "./pages/MovieDescription";
import Search from "./components/Search/Search";
import Layout from "./components/Layout/Layout";
import { MoviesProvider } from "./context/MoviesProvider";
import MyList from "./pages/MyList/MyList";

function App() {
  const location = useLocation();
  return (
    <MoviesProvider>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/description/:id" component={MovieDescription} />
            <Route exact path="/search/:searchName" component={Search} />
            <Route exact path="/mylist" component={MyList} />
          </Layout>
        </Switch>
      </AnimatePresence>
    </MoviesProvider>
  );
}

export default App;
