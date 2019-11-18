import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import NewForm from "./components/NewForm.js";
import Show from "./components/Show";
import UpdateForm from "./components/UpdateForm.js";
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
  }

  async getBookmarks() {
    const response = await axios(`${baseURL}/bookmarks`);
    const data = response.data;
    this.setState({
      bookmarks: data
    });
  }

  async componentDidMount() {
    this.getBookmarks();
  }

  // async editBookmark(selectedBookmark) {
  //   const updatedBookmarks = this.state.bookmarks.map((bookmark) => {
  //     if (bookmark._id === selectedBookmarkId) {
  //       const updatedBookmark = {
  //         ...selectedBookmark,
  //         celebrated: !selectedHoliday.celebrated
  //       }
  //         return updatedHoliday
  //       } else {
  //         return holiday
  //       }
  //     })
  //     this.setState({
  //       holidays: updatedHolidays
  //     })
  //   }

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
    this.setState({
      bookmark: bookmark
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
                  <td> {bookmark.url}</td>
                  {/* <td>{bookmark.description}</td> */}
                  <td onClick={() => this.deleteBookmark(bookmark._id)}>X</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.bookmark && <Show bookmark={this.state.bookmark} />}
      </div>
    );
  }
}

export default App;
