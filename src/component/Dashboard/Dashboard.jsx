import { Component } from "react";
import NavbarComponent from "./shared/NavbarComponent";
import SidebarComponent from "./shared/SidebarComponent";
import PannelComponent from "./shared/PannelComponent";
import FooterComponent from "./shared/FooterComponent";
import axios from "./../../axiosClient/eaxios";
import { connect } from "react-redux";
import { userDetailsAction } from "../../store/slice/userDetails-slice";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }

  getUserDetails = () => {
    axios
      .get(`/api/user/details`)
      .then((res) => {
        console.log(".......User Details: ", res.data);
        this.props.updateUserDetails(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  componentDidMount() {
    this.getUserDetails();
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

const mapStateToPros = (state) => {
  return {
    auth: state.auth,
    userDetails: state.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDetails: (data) => dispatch(userDetailsAction.handleUpdateUser(data)),
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(Dashboard);
