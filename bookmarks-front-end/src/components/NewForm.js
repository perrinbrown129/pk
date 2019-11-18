import React, { Component } from "react";
import axios from "axios";

class NewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log("test");
    const baseURL = this.props.baseURL;
    const response = await axios.post(`${baseURL}/bookmarks`, {
      name: this.state.name,
      url: this.state.url
    });
    this.setState({
      name: "",
      url: ""
    });
    this.props.getBookmarks();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
          placeholder="Add site name"
        />
        <label htmlFor="url"></label>
        <input
          type="text"
          id="url"
          name="url"
          onChange={this.handleChange}
          value={this.state.url}
          placeholder="Add URL"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewForm;
