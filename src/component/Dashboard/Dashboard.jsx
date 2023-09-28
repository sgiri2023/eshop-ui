import { Component } from "react";
import NavbarComponent from "./shared/NavbarComponent";
import SidebarComponent from "./shared/SidebarComponent";
import PannelComponent from "./shared/PannelComponent";
import FooterComponent from "./shared/FooterComponent";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    return (
      <div>
        <div className="container-scroller">
          <NavbarComponent />
          <div className="page-body-wrapper">
            <SidebarComponent {...this.props} />
            <div className="main-panel-container">
              <div className="main-pannel-wrapper">
                <PannelComponent {...this.props} />
              </div>
              {/* <FooterComponent /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
