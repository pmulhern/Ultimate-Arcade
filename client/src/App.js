import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Admin from "./components/Admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import { Game } from "./Game/game";


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
        <PrivateRoute path="/home" roles={["user", "admin"]} component={Home} />
        <Route exact path="/Game" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
