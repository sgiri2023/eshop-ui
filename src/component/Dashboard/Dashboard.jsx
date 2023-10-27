import { Component } from "react";
import NavbarComponent from "./shared/NavbarComponent";
import SidebarComponent from "./shared/SidebarComponent";
import PannelComponent from "./shared/PannelComponent";
import FooterComponent from "./shared/FooterComponent";
import axios from "./../../axiosClient/eaxios";
import { connect } from "react-redux";
import { userDetailsAction } from "../../store/slice/userDetails-slice";
import { accountInfoAction } from "../../store/slice/account-slice";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = { data: "", isBankLoading: true, bankList: [] };
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

  getBankDetails = () => {
    this.props.updateAccountDetails(this.state.bankList);
    this.props.updateAccountDetailsLoadingState(true);
    this.setState(
      {
        isBankLoading: true,
        bankList: [],
      },
      () => {
        axios
          .get(`/api/wallet/details`)
          .then((res) => {
            console.log(".......Account Details: ", res.data);
            this.setState(
              {
                isBankLoading: false,
                bankList: res.data,
              },
              () => {
                this.props.updateAccountDetails(res.data);
                this.props.updateAccountDetailsLoadingState(false);
              }
            );
          })
          .catch((err) => {
            console.log("Error: ", err);
            this.setState(
              {
                isBankLoading: false,
              },
              () => {
                this.props.updateAccountDetailsLoadingState(false);
              }
            );
          });
      }
    );
  };

  componentDidMount() {
    this.getUserDetails();
    this.getBankDetails();
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
    updateAccountDetails: (data) => dispatch(accountInfoAction.updateAccoutDetails(data)),
    updateAccountDetailsLoadingState: (data) =>
      dispatch(accountInfoAction.updateAccoutLoading(data)),
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(Dashboard);
