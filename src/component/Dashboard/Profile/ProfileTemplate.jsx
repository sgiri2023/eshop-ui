import { Component } from "react";
import { Row, Col, Nav, Tab } from "react-bootstrap";

class ProfileTemplate extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    return (
      <div className="profile-template-one">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="gap-10">
            <Col sm={2} className="account-left-tab-container boxshadow_template_one">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Address</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col sm={9} className="account-right-tab-container boxshadow_template_one">
              <Tab.Content>
                <Tab.Pane eventKey="first">Profile</Tab.Pane>
                <Tab.Pane eventKey="second">Address</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default ProfileTemplate;
