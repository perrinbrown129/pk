import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import NewForm from "./components/NewForm.js";
import Show from "./components/Show";

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "your heroku bakend url here";
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      bookmark: {}
    };
    this.getBookmarks = this.getBookmarks.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
    this.getBookmark = this.getBookmark.bind(this);
    this.toggleVisited = this.toggleVisited.bind(this);
  }

  componentDidMount() {
    this.getBookmarks();
  }

  async getBookmarks() {
    const response = await axios(`${baseURL}/bookmarks`);
    const bookmarks = response.data;

    this.setState({ bookmarks: bookmarks });
  }

  async deleteBookmark(id) {
    await axios.delete(`${baseURL}/bookmarks/${id}`);
    const filteredBookmarks = this.state.bookmarks.filter(bookmark => {
      return bookmark._id !== id;
    });

    this.setState({
      bookmarks: filteredBookmarks
    });
  }

  getBookmark(bookmark) {
    this.setState({ bookmark: bookmark });
  }

  async toggleVisited(selectedBookmark, selectedBookmarkId) {
    console.log(selectedBookmark);
    const updatedBookmarks = this.state.bookmarks.map(bookmark => {
      if (bookmark._id === selectedBookmarkId) {
        const updatedBookmark = {
          ...selectedBookmark,
          visited: !selectedBookmark.visited
        };
        return updatedBookmark;
      } else {
        return bookmark;
      }
    });
    this.setState({
      bookmarks: updatedBookmarks
    });
  }

  render() {
    return (
      <div className="container">
        <h1>My Bookmarks</h1>
        <NewForm getBookmarks={this.getBookmarks} baseURL={baseURL} />
        <table>
          <tbody>
            {this.state.bookmarks.map(bookmark => {
              return (
                <tr
                  onMouseOver={() => this.getBookmark(bookmark)}
                  key={bookmark._id}
                >
                  <td>
                    <a href={"http://" + bookmark.url} target="_blank">
                      {bookmark.name}
                    </a>
                  </td>
                  <td
                    className={bookmark.visited ? "visited" : null}
                    onDoubleClick={() =>
                      this.toggleVisited(bookmark, bookmark._id)
                    }
                  >
                    {" "}
                    {bookmark.url}
                  </td>
                  {/* <td>{bookmark.description}</td> */}
                  <td>
                    {" "}
                    <button onClick={() => this.deleteBookmark(bookmark._id)}>
                      DELETE{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <br />
        <br />
        {this.state.bookmark && <Show bookmark={this.state.bookmark} />}
      </div>
    );
  }
}

export default App;
