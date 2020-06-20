import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <br />
            <h1 className="text-center">Welcome to ToDos</h1>
            <br />
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-md-6 mx-auto">
            <label className="userName">
              <b>Username</b>
            </label>
            <input
              type="email"
              className="form-control "
              id="userName"
              name="userName"
              placeholder="sample@sample.com"
              onChange={this.inputHandler}
            />
          </div>
          <div className="form-group col-md-6 mx-auto">
            <label className="passWord">
              <b>Password</b>
            </label>
            <input
              type="Password"
              className="form-control"
              id="passWord"
              placeholder="Password"
              onChange={this.inputHandler}
            />
          </div>
          <div className="col-md-6 mx-auto">
            <div className="form-group form-check  ">
              <input
                className="form-check-input"
                type="checkbox"
                id="autoSizingCheck"
                name="passWord"
              />
              <label className="form-check-label" htmlFor="autoSizingCheck">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </div>
          <div style={{ textAlign: "center" }} className="col-md-6 mx-auto">
            <span>
              Not Registered? <a href="#">Signup here</a>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
