import { Component } from "react";

class ProgressSteps extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    return (
      <div className="progress-step-container">
        <div class="root">
          <div class="container">
            <ul class="progressbar">
              <li>Step 1</li>
              <li>Step 2</li>
              <li>Step 3</li>
              <li className="active">Step 4</li>
              <li className="active">Step 5</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressSteps;
