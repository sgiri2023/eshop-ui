import { Component } from "react";
import DashboardRoute from "../../../routes/DashboardRoute";

class PannelComponent extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    return (
      <div className="pannel-content">
        <DashboardRoute {...this.props} />
      </div>
    );
  }
}

export default PannelComponent;
