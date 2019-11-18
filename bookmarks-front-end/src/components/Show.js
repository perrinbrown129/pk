import React from "react";

class Show extends React.Component {
  render() {
    return (
      <>
        <div className="details">
          <h3>Bookmark Info:</h3>
          <hr />
          <h4> {this.props.bookmark.name} </h4>
          {/* <h6>
            <span>Celebrated:</span>{" "}
            {this.props.holiday.celebrated ? "celebrated" : "not celebrated"}{" "}
          </h6> */}
          <h6>
            <span>URL:</span> {this.props.bookmark.url}
          </h6>
          <p>
            <span>Description:</span> {this.props.bookmark.description}
          </p>
        </div>
      </>
    );
  }
}
export default Show;
