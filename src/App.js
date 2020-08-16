import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";
import MovieDescription from "./pages/MovieDescription/MovieDescription";
import Search from "./pages/Search/Search";
import Layout from "./components/Layout/Layout";
import MyList from "./pages/MyList/MyList";
import NotFound from "./pages/NotFound/NotFound";
import { MoviesProvider } from "./context/MoviesProvider";

function App() {
  const location = useLocation();
  return (
    <MoviesProvider>
      <AnimatePresence exitBeforeEnter>
        <Layout>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Home} />
            <Route exact path="/description/:id" component={MovieDescription} />
            <Route exact path="/search/:searchName" component={Search} />
            <Route exact path="/mylist" component={MyList} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </AnimatePresence>
    </MoviesProvider>
  );
}

export default App;
