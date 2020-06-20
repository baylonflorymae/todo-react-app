import React, { Component } from "react";
import axios from "axios";
import config from "./config/config";

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { input: "", errorMsg: "" },
      lastName: { input: "", errorMsg: "" },
      middleInitial: { input: "", errorMsg: "" },
      userName: { input: "", errorMsg: "" },
      passWord: { input: "", errorMsg: "" },
      confirmPassword: { input: "", errorMsg: "" },
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstNameValidator = this.firstNameValidator.bind(this);
    this.lastNameValidator = this.lastNameValidator.bind(this);
    this.middleInitialValidator = this.middleInitialValidator.bind(this);
    this.userNameValidator = this.userNameValidator.bind(this);
    this.passWordValidator = this.passWordValidator.bind(this);
    this.confirmPassWordValidator = this.confirmPassWordValidator.bind(this);
  }

  inputHandler(e) {
    this.setState({
      [e.target.name]: { ...this.state[e.target.name], input: e.target.value },
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.firstNameValidator();
    this.lastNameValidator();
    this.middleInitialValidator();
    this.userNameValidator();
    this.passWordValidator();
    this.confirmPassWordValidator();

    this.setState({}, () => {
      let errorCount = 0;

      for (const key in this.state) {
        // this.state[key].errorMsg.length > 0 ? errorCount++ : "";
        console.log(this.state[key]);
      }

      console.log(errorCount);
    });

    if (this.state.users === "") {
      return;
    }

    const newUser = {
      firstName: this.state.firstName.input,
      lastName: this.state.lastName.input,
      middleInitial: this.state.middleInitial.input,
      userName: this.state.userName.input,
      passWord: this.state.passWord.input,
      confirmPassword: this.state.confirmPassword.input,
    };

    this.setState(() => ({
      users: newUser,
    }));

    // try {
    //   await axios.post(`http://localhost:5000`, newUser);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  firstNameValidator() {
    if (this.state.firstName.input.length === 0) {
      this.setState({
        firstName: {
          ...this.state.firstName,
          errorMsg: "First Name can't be empty!",
        },
      });
    } else {
      this.setState({
        firstName: {
          ...this.state.firstName,
          errorMsg: "",
        },
      });
    }
  }

  lastNameValidator() {
    if (this.state.lastName.input.length === 0) {
      this.setState({
        lastName: {
          ...this.state.lastName,
          errorMsg: "Last Name can't be empty!",
        },
      });
    } else {
      this.setState({ lastName: { ...this.state.lastName, errorMsg: "" } });
    }
  }

  middleInitialValidator() {
    if (this.state.middleInitial.input.length === 0) {
      this.setState({
        middleInitial: {
          ...this.state.middleInitial,
          errorMsg: "Middle Initial can't be empty!",
        },
      });
    } else {
      this.setState({
        middleInitial: { ...this.state.middleInitial, errorMsg: "" },
      });
    }
  }

  userNameValidator() {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Clean up first the error
    this.setState({
      userName: {
        ...this.state.userName,
        errorMsg: "",
      },
    });

    if (this.state.userName.input.length === 0) {
      // console.log("You have entered an invalid email!");
      this.setState({
        userName: {
          ...this.state.userName,
          errorMsg: "Username can't be empty!",
        },
      });
    } else if (!RegExp(mailFormat).test(this.state.userName.input)) {
      this.setState({
        userName: {
          ...this.state.userName,
          errorMsg: "Please provide a valid email!",
        },
      });
    } else {
      axios
        .get(
          `${config.server_url}/api/todo?user_id=${this.state.userName.input}`
        )
        .then((data) => {
          const { is_user_id_exist } = data.data;
          if (is_user_id_exist) {
            this.setState({
              userName: {
                ...this.state.userName,
                errorMsg: "Email already exist!",
              },
            });
          }
        });
    }
  }

  passWordValidator() {
    const passWordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if (this.state.passWord.input.length === 0) {
      this.setState({
        passWord: {
          ...this.state.passWord,
          errorMsg: "Password can't be empty!",
        },
      });
    } else if (!RegExp(passWordFormat).test(this.state.passWord.input)) {
      this.setState({
        passWord: {
          ...this.state.passWord,
          errorMsg:
            "Password must be 7 to 15 characters which contain at least one numeric digit and a special character.",
        },
      });
    } else {
      this.setState({ passWord: { ...this.state.passWord, errorMsg: "" } });
    }
  }

  confirmPassWordValidator() {
    if (
      this.state.passWord.input.length ===
      this.state.confirmPassword.input.length
    ) {
      this.setState({
        confirmPassword: {
          ...this.state.confirmPassword,
          errorMsg: "",
        },
      });
    } else if (
      this.state.passWord.input.length !==
      this.state.confirmPassword.input.length
    ) {
      this.setState({
        confirmPassword: {
          ...this.state.confirmPassword,
          errorMsg: "Password doesn't matched!",
        },
      });
    } else {
      this.setState({
        confirmPassword: {
          ...this.state.confirmPassword,
          errorMsg: "",
        },
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <br />
            <h1 className="text-center">Registration Form</h1>
            <br />
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">
                <b> First Name</b>
              </label>
              <input
                type="text"
                className={`form-control ${
                  this.state.firstName.errorMsg.length !== 0 ? "is-invalid" : ""
                }`}
                placeholder="First Name"
                name="firstName"
                id="firstName"
                value={this.state.firstName.input}
                onChange={this.inputHandler}
                onBlur={this.firstNameValidator}
              />
              {this.state.firstName.errorMsg.length !== 0 && (
                <div className="invalid-feedback">
                  {this.state.firstName.errorMsg}
                </div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">
                <b> last Name</b>
              </label>
              <input
                type="text"
                className={`form-control ${
                  this.state.lastName.errorMsg.length !== 0 ? "is-invalid" : ""
                }`}
                placeholder="Last Name"
                name="lastName"
                id="lastName"
                value={this.state.lastName.input}
                onChange={this.inputHandler}
                onBlur={this.lastNameValidator}
              />
              {this.state.lastName.errorMsg.length !== 0 && (
                <div className="invalid-feedback">
                  {this.state.lastName.errorMsg}
                </div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="middleInitial">
                <b>Middle Initial</b>
              </label>
              <input
                type="text"
                className={`form-control ${
                  this.state.middleInitial.errorMsg.length !== 0
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Middle Initial"
                name="middleInitial"
                id="middleInitial"
                value={this.state.middleInitial.input}
                onChange={this.inputHandler}
                onBlur={this.middleInitialValidator}
              />
              {this.state.middleInitial.errorMsg.length !== 0 && (
                <div className="invalid-feedback">
                  {this.state.middleInitial.errorMsg}
                </div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="userName">
                <b>Username</b>
              </label>
              <input
                type="text"
                className={`form-control ${
                  this.state.userName.errorMsg.length !== 0 ? "is-invalid" : ""
                }`}
                placeholder="sample@sample.com"
                name="userName"
                id="userName"
                value={this.state.userName.input}
                onChange={this.inputHandler}
                onBlur={this.userNameValidator}
              />
              {this.state.userName.errorMsg.length !== 0 && (
                <div className="invalid-feedback">
                  {this.state.userName.errorMsg}
                </div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input
                type="password"
                className={`form-control ${
                  this.state.passWord.errorMsg.length !== 0 ? "is-invalid" : ""
                } `}
                id="password"
                name="passWord"
                value={this.state.passWord.input}
                onChange={this.inputHandler}
                onBlur={this.passWordValidator}
              />
              {this.state.passWord.errorMsg.length !== 0 && (
                <div className="invalid-feedback">
                  {this.state.passWord.errorMsg}
                </div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="password2">
                <b>Confirm Password</b>
              </label>
              <input
                type="password"
                className={`form-control  ${
                  this.state.confirmPassword.errorMsg.length !== 0
                    ? "is-invalid"
                    : ""
                }`}
                id="password2"
                name="confirmPassword"
                value={this.state.confirmPassword.input}
                onChange={this.inputHandler}
                onBlur={this.confirmPassWordValidator}
              />
              {this.state.confirmPassword.errorMsg.length !== 0 && (
                <div className="invalid-feedback">
                  {this.state.confirmPassword.errorMsg}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            Submit Form
          </button>
        </form>
      </div>
    );
  }
}
