import React, { Component } from "react";
import axios from "axios";
import SearchItem from "./SearchItem";
import TodoList from "./TodoList";
import Pagination from "./Pagination";

import "./App.css";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      taskName: "",
      taskInformation: "",
      isEditing: false,
      editIndex: null,
      searchValue: "",
      searchResult: [],
      taskPagination: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.searchItemHandler = this.searchItemHandler.bind(this);
    this.onChangePageHandler = this.onChangePageHandler.bind(this);
    this.searchInputHandler = this.searchInputHandler.bind(this);
  }

  componentDidMount() {
    // console.log(config);
    axios
      .get(`http://localhost:5000/todo`)
      .then((result) => {
        // console.log(result);
        const todos = result.data;
        this.setState({
          items: todos,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleEditChange(e) {
    e.preventDefault();

    const _items = this.state.items.slice();

    _items[this.state.editIndex] = {
      id: this.state.items[this.state.editIndex].id,
      taskName: this.state.taskName,
      taskInformation: this.state.taskInformation,
    };

    // console.log(_items);
    this.setState({
      items: _items,
      taskName: "",
      taskInformation: "",
      isEditing: false,
    });

    axios
      .put(`http://localhost:5000/todo`, _items)
      .then((res) => {
        // console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.items === "") {
      return;
    }
    const newItem = {
      taskName: this.state.taskName,
      taskInformation: this.state.taskInformation,
      id: Date.now(),
    };
    this.setState((state) => ({
      taskName: "",
      items: [newItem, ...state.items],
      taskInformation: "",
    }));
    // console.log(this.state.items);

    axios
      .post(`http://localhost:5000/todo`, {
        items: [newItem, ...this.state.items],
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  onDelete(forRemoveItem) {
    // console.log(forRemoveItem);
    const data = this.state.items.filter(
      (item) => item.id !== forRemoveItem.id
    );

    this.setState({ items: data });

    axios
      .put(`http://localhost:5000/todo`, data)
      .then((res) => {})
      .catch((e) => {
        console.error(e);
      });
  }

  editHandler(forEditContent, index) {
    // console.log(forEditContent.id);
    this.setState(() => ({
      taskName: forEditContent.taskName,
      taskInformation: forEditContent.taskInformation,
      isEditing: true,
      editIndex: index,
    }));
  }

  searchInputHandler(e) {
    e.preventDefault();

    this.setState({ searchValue: e.target.value });
  }

  searchItemHandler(searchValue, e) {
    if (e) {
      e.preventDefault();
    }

    const items = this.state.items.filter(function (item) {
      return (
        item.taskName.includes(searchValue) ||
        item.taskInformation.includes(searchValue)
      );
    }, this);

    this.setState({ searchResult: items, searchValue });
  }

  onChangePageHandler(pageNumber) {
    this.setState({ taskPagination: pageNumber });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <br />
            <h1 className="text-center">ToDo List </h1>
          </div>
        </div>
        <br />
        <form
          onSubmit={
            this.state.isEditing ? this.handleEditChange : this.handleSubmit
          }
        >
          <div className="form-group">
            <label htmlFor="new-todo">
              <b>Task Name:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="new-todo"
              placeholder="Add task name..."
              name="taskName"
              value={this.state.taskName}
              onChange={this.handleInputChange}
              required
            />
            <br />
            <label htmlFor="todo-information">
              <b>Task Information:</b>
            </label>
            <textarea
              className="form-control"
              id="todo-information"
              placeholder="Write task information..."
              rows="3"
              name="taskInformation"
              value={this.state.taskInformation}
              onChange={this.handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            {this.state.isEditing ? "Save Changes" : "Submit"}
            {this.state.items.taskName}
            {this.state.items.taskInformation}
          </button>
        </form>
        <SearchItem
          searchItemHandler={this.searchItemHandler}
          searchInputHandler={this.searchInputHandler}
        />
        <TodoList
          items={this.state.items}
          onDelete={this.onDelete}
          editHandler={this.editHandler}
          taskPagination={this.state.taskPagination}
        />
        <Pagination
          pageSize={5}
          items={
            this.state.searchResult.length !== 0 &&
            this.state.searchValue.length !== 0
              ? this.state.searchResult
              : this.state.searchResult.length === 0 &&
                this.state.searchValue.length !== 0
              ? this.state.searchResult
              : this.state.items
          }
          onChangePageHandler={this.onChangePageHandler}
        />
      </div>
    );
  }
}
