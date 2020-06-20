import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TodoApp from "./ToDoApp";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/home">Home</Link>
          </nav>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <SignUpPage />
            </Route>
            <Route path="/home">
              <TodoApp />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
