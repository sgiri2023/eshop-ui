import { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "./component/Dashboard/Dashboard";
import Login from "./component/Login/Login";
import { PrivateRoute } from "./routes/PrivateRoute/PrivateRoute";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = { data: "", token: "token" };
  }
  render() {
    const { token } = this.state;
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} token={token} />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
