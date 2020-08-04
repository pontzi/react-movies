import React from "react";
import Carousel from "./components/carousel/Carousel";
import { BrowserRouter, Switch, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Carousel} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
