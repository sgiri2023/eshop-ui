import { Component } from "react";

class Loading extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    return (
      <div className="loading-container">
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default Loading;
