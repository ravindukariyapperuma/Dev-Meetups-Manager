import React from "react";
import {
  BrowserRouter as Router,
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import GoogleApp from "./Components/GoogleComponents/GoogleApp";
import ZoomApp from "./Components/ZoomComponents/ZoomApp";
import FacebookApp from "./Components/FacebookComponents/FacebookApp";
import GitHubApp from "./Components/GitHubComponents/GitHubApp";
import Home from "./Components/CommonComponents/Home";

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
