import React from "react";
import axios from "axios";

class EditForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      url: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }
}

class UpdateForm extends React.Component {
  componentDidMount() {
    console.log("edited");
    this.setState({
      name: this.props.bookmark.name,
      url: this.props.bookmark.url
    });
  }

  handleOnChange(event) {
    const { key, value } = event.target;
    this.setState({
      [key]: value
    });
  }

  async handleEditSubmit(event) {
    try {
      event.preventDefault();
      const bookmarkID = this.props.bookmark._id;
      const url = `http://localhost:3003/bookmarks/${bookmarkID}`;
      const payload = {
        name: this.state.name,
        url: this.state.url
      };
      const updatedBookmark = await axios.put(url, payload);
      this.props.getBookmarks();
      this.setState({
        title: "",
        url: ""
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleEditSubmit}>
        <div className="row">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <label htmlFor="url">URL</label>
          <input type="text" id="url" />
          <label htmlFor="description">Description</label>
          <textarea className="u-full-width" id="description"></textarea>
          <input type="submit" value="Update Bookmark" />
        </div>
      </form>
    );
  }
}

export default UpdateForm;
