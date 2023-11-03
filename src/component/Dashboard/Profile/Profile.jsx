import { Component } from "react";
import Account from "./Account/Account";
import Address from "./Address/Address";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
class Profile extends Component {
  constructor() {
    super();
    this.state = { data: "", activeKey: "profile" };
  }
  render() {
    const { activeKey } = this.state;
    return (
      <div>
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => {
            this.setState({
              activeKey: k,
            });
          }}
          className="mb-3 horizoontal-tab"
          style={{ marginBottom: "0px !important" }}
        >
          <Tab eventKey="profile" title="Profile">
            Profile
          </Tab>
          <Tab eventKey="account" title="Account">
            <Account />
          </Tab>
          <Tab eventKey="address" title="Address">
            <Address />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Profile;
