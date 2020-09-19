import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./Signup";
import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/profile/:name" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
