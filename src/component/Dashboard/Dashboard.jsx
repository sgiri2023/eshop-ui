import { Component } from "react";
import NavbarComponent from "./shared/NavbarComponent";
import SidebarComponent from "./shared/SidebarComponent";
import PannelComponent from "./shared/PannelComponent";
import FooterComponent from "./shared/FooterComponent";
import axios from "./../../axiosClient/eaxios";
import { connect } from "react-redux";
import { userDetailsAction } from "../../store/slice/userDetails-slice";
import { accountInfoAction } from "../../store/slice/account-slice";
import { cartInfoAction } from "../../store/slice/cart-slice";

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

  getAddressDetails = () => {
    this.props.updateUserAddresss([]);
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`api/user/get-address-list`)
          .then((res) => {
            console.log(".......Address List: ", res.data);
            let defaultAddressId = "";
            res.data.map((address) => {
              if (address.isDefault == true) {
                defaultAddressId = address.id;
              }
            });
            if (defaultAddressId === "" && res.data.length > 0) {
              defaultAddressId = res.data[0].id;
            }
            this.setState(
              {
                addressList: res.data,
                isLoading: false,
              },
              () => {
                this.props.updateUserAddresss(res.data);
                this.props.updateCartAddressId(defaultAddressId);
              }
            );
          })
          .catch((err) => {
            console.log("Error: ", err);
            this.setState({
              isLoading: false,
            });
          });
      }
    );
  };

  componentDidMount() {
    this.getUserDetails();
    this.getBankDetails();
    this.getAddressDetails();
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
    updateUserAddresss: (data) => dispatch(userDetailsAction.updateUserAddress(data)),
    updateAccountDetails: (data) => dispatch(accountInfoAction.updateAccoutDetails(data)),
    updateAccountDetailsLoadingState: (data) =>
      dispatch(accountInfoAction.updateAccoutLoading(data)),
    updateCartAddressId: (data) => dispatch(cartInfoAction.updateAddressId(data)),
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(Dashboard);
