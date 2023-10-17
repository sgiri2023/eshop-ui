import { Component } from "react";
import ProfileTemplate from "./ProfileTemplate";

class Profile extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    return (
      <div>
        <ProfileTemplate />
      </div>
    );
  }
}

export default Profile;
