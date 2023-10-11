import { Component } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { ROUTE_LINK } from "../../../constant/sidebarRouteLink";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { connect } from "react-redux";
import { GrHomeRounded } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
// CgProfile
// GrHomeRounded
// TbReportAnalytics
class SidebarComponent extends Component {
  constructor() {
    super();
    this.state = { data: "", activeRoute: "" };
  }
  handleActiveRoute = (routeName) => {
    this.setState({
      activeRoute: routeName,
    });
  };
  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  render() {
    const { activeRoute } = this.state;
    // this.props.appInfo.isSideBarExpand
    return (
      <nav
        className={`sidebar sidebar-offcanvas ${
          this.props.appInfo.isSideBarExpand === true ? "expand-sidebar" : "collapse-sidebar"
        }`}
        id="sidebar"
      >
        <ul className="nav">
          {ROUTE_LINK.map((link, index) => (
            <li className="nav-item nav-profile " key={index}>
              <div
                onClick={() => {
                  if (activeRoute === link.name) {
                    this.handleActiveRoute("");
                  } else {
                    this.handleActiveRoute(link.name);
                  }
                }}
                className="nav-link-wrapper"
                data-toggle="collapse"
              >
                <Link
                  className={`nav-link parent-link ${
                    this.isPathActive(link.link) ? "active-link" : ""
                  }`}
                  to={link.link}
                >
                  {/* <span className="sidebar-menu-icon">
                    <GrHomeRounded />
                  </span> */}
                  {link.name.toLowerCase() === "profile" ? (
                    <CgProfile className="sidebar-menu-icon" />
                  ) : link.name.toLowerCase() === "product" ? (
                    <MdProductionQuantityLimits className="sidebar-menu-icon" />
                  ) : link.name.toLowerCase() === "report" ? (
                    <TbReportAnalytics className="sidebar-menu-icon" />
                  ) : (
                    <GrHomeRounded className="sidebar-menu-icon" />
                  )}

                  <span className="sidebar-menu-parent-label">
                    {" "}
                    {this.props.appInfo.isSideBarExpand === true ? link.name : null}
                  </span>
                </Link>
                {link.subLink.length > 0 ? (
                  activeRoute === link.name ? (
                    <MdExpandLess className="sidebar-parent-icon" />
                  ) : (
                    <MdExpandMore className="sidebar-parent-icon" />
                  )
                ) : (
                  ""
                )}
              </div>

              <div className={`${activeRoute === link.name ? "display-block" : "display-none"}`}>
                {link.subLink.length > 0 && (
                  <ul className="nav">
                    {link.subLink.map((subLink, subIndex) => (
                      <li className="nav-item nav-profile " key={subIndex}>
                        <Link
                          className={`nav-link sub-link ${
                            this.isPathActive(`${link.link}${subLink.link}`) ? "active-link" : ""
                          }`}
                          to={`${link.link}${subLink.link}`}
                        >
                          {subLink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

const mapStateToPros = (state) => {
  return {
    appInfo: state.appInfo,
  };
};

export default connect(mapStateToPros)(SidebarComponent);
