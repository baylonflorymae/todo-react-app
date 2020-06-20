import React, { Component } from "react";

export default class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };

    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(e) {
    e.preventDefault();

    this.setState({ search: e.target.value });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <a className="navbar-brand "></a>
          <form
            onSubmit={(e) => this.props.searchItemHandler(this.state.search, e)}
            className="form-inline my-2 my-lg-0p"
          >
            <input
              className="form-control mr-sm-2"
              type="Search"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.inputHandler}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </nav>
      </div>
    );
  }
}
