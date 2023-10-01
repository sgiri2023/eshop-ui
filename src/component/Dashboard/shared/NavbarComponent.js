import { Component } from "react";
import { Link } from "react-router-dom";
import { BiMenu, BiSearchAlt2, BiLogOutCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { connect } from "react-redux";
import { authAction } from "../../../store/slice/auth-slice";

class NavbarComponent extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12  fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/dashboard/home">
            <svg
              width="128"
              height="146"
              viewBox="0 0 128 146"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.388 18.0772L1.15175 36.1544L1.05206 72.5081L0.985596 108.895L32.4213 127.039C49.7009 137.008 63.9567 145.182 64.1228 145.182C64.289 145.182 72.8956 140.264 83.2966 134.283C93.6644 128.268 107.82 120.127 114.732 116.139L127.26 108.895V101.119V93.3102L126.529 93.7089C126.097 93.9415 111.941 102.083 95.06 111.853C78.1459 121.622 64.156 129.531 63.9567 129.498C63.724 129.431 52.5587 123.051 39.1005 115.275L14.6099 101.152V72.5746V43.9967L25.6756 37.6165C31.7234 34.1274 42.8223 27.7472 50.2991 23.4273C57.7426 19.1073 63.9899 15.585 64.1228 15.585C64.2557 15.585 72.9288 20.5362 83.3963 26.5841L113.902 43.9967L118.713 41.1657L127.26 36.1544L113.902 28.5447C103.334 22.2974 64.3554 -0.033191 64.0231 3.90721e-05C63.8237 3.90721e-05 49.568 8.14142 32.388 18.0772Z"
                fill="#1F1F1F"
              ></path>
              <path
                d="M96.0237 54.1983C78.9434 64.0677 64.721 72.2423 64.4219 72.3088C64.0896 72.4084 55.7488 67.7562 44.8826 61.509L25.9082 50.543V58.4186L25.9414 66.2609L44.3841 76.8945C54.5193 82.743 63.1591 87.6611 63.5911 87.8272C64.2557 88.0598 68.9079 85.5011 95.5585 70.1156C112.705 60.1798 126.861 51.9719 127.027 51.839C127.16 51.7061 127.227 48.1505 127.194 43.9302L127.094 36.2541L96.0237 54.1983Z"
                fill="#1F1F1F"
              ></path>
              <path
                d="M123.771 66.7261C121.943 67.7562 107.854 75.8976 92.4349 84.8033C77.0161 93.7089 64.289 100.986 64.1228 100.986C63.9567 100.986 55.3501 96.0683 44.9491 90.0869L26.0744 79.1874L25.9747 86.8303C25.9082 92.6788 26.0079 94.5729 26.307 94.872C26.9383 95.4369 63.7241 116.604 64.1228 116.604C64.4551 116.604 126.496 80.8821 127.027 80.4169C127.16 80.284 127.227 76.7284 127.194 72.4749L127.094 64.7987L123.771 66.7261Z"
                fill="#1F1F1F"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <div className="d-flex align-items-center menu-icon-wrapper">
            <BiMenu className="navbar-menu-icon" />
          </div>
          {/*Resource From - https://csshint.com/css-search-boxes/ */}
          <div className="search-form-wrapper">
            <div className="navbar-main-search-form d-flex align-items-center">
              <input type="search" placeholder="Search" className="search-input"></input>
              <button className="search-button">
                <BiSearchAlt2 className="search-icon" />
              </button>
            </div>
          </div>
          <div className="control-section">
            <div
              className="navbar-logout tooltip-custom"
              onClick={() => {
                this.handleLogout();
              }}
            >
              <BiLogOutCircle className="logout-icon" />
              <span class="tooltiptext">Logout</span>
            </div>
            <div className="navbar-profile tooltip-custom">
              <AiOutlineUser className="profile-icon" />
              <span className="profile-name">{"Smith"}</span>
              <span class="tooltiptext">Profile</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToPros = (state) => {
  console.log("Store from login: ", state);
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (data) => dispatch(authAction.logOut()),
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(NavbarComponent);
