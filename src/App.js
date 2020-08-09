import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import MovieDescription from "./pages/MovieDescription";
import Layout from "./components/Layout/Layout";

function App() {
  const location = useLocation();
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/description/:id"
            component={MovieDescription}
          ></Route>
        </Switch>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
