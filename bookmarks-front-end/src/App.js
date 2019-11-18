import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import NewForm from "./components/NewForm.js";
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
      bookmarks: []
    };
    this.getBookmarks = this.getBookmarks.bind(this);
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

  render() {
    return (
      <div className="container">
        <h1>My Bookmarks</h1>
        <NewForm getBookmarks={this.getBookmarks} baseURL={baseURL} />
        <table>
          <tbody>
            {this.state.bookmarks.map(bookmark => {
              return (
                <tr key={bookmark._id}>
                  <td> {bookmark.name}</td>
                  <td> {bookmark.url}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
