import React, { Component } from "react";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
      initialPage: 1,
    };

    this.setPage = this.setPage.bind(this);
    this.getPager = this.getPager.bind(this);
  }

  componentDidMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.state.initialPage);
      this.setState({ pageSize: this.props.pageSize });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      this.setPage(this.state.initialPage);
    }
  }

  setPage(page) {
    let { items, pageSize } = this.props;
    let pager = this.state.pager;

    pager = this.getPager(items.length, page, pageSize);

    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({ pager: pager });

    this.props.onChangePageHandler(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;

    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.ceil(startIndex + pageSize - 1, totalItems - 1);

    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      (item) => startPage + item
    );

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  render() {
    let pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }
    return (
      <div className="row pro-result">
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 pagination-style">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  disabled={pager.currentPage === 1}
                  onClick={() => this.setPage(pager.currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {pager.pages.map((page, index) => (
                <li key={index}>
                  <button
                    className={pager.currentPage === page ? "active" : ""}
                    onClick={() => this.setPage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li>
                <button
                  disabled={pager.currentPage === pager.totalPages}
                  onClick={() => this.setPage(pager.currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
