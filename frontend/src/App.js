import React from "react";
import {
  // BrowserRouter as Router,
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import GoogleApp from "./components/GoogleComponents/GoogleApp";
import ZoomApp from "./components/ZoomComponents/ZoomApp";
import FacebookApp from "./components/FacebookComponents/FacebookApp";
import GitHubApp from "./components/GitHubComponents/GitHubApp";
import Home from "./components/CommonComponents/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/GoogleApp"} exact component={GoogleApp} />
        <Route path={"/ZoomApp"} exact component={ZoomApp} />
        <Route path={"/FacebookApp"} exact component={FacebookApp} />
        <Route path={"/GitHubApp"} exact component={GitHubApp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
