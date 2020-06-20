import React, { Component } from "react";

export default class TodoList extends Component {
  render() {
    return (
      <div className="button-group" role="group">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.taskPagination.map((item, index) => (
              <tr key={item.id}>
                <td className="text-left font-weight-normal">
                  {item.taskName}
                </td>
                <td className="text-left text-wrap">{item.taskInformation}</td>
                <td className="text-right">
                  <button
                    type="button"
                    href="#"
                    className="btn btn-success btn-sm mr-1 "
                    onClick={() => this.props.editHandler(item, index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    href="#"
                    className="btn btn-danger btn-sm"
                    onClick={() => this.props.onDelete(item)}
                  >
                    Done
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
