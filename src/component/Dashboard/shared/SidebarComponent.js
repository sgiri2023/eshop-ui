import { Component } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { ROUTE_LINK } from "../../../constant/sidebarRouteLink";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

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
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
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
                  {link.name}
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

export default SidebarComponent;
