import { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute/PrivateRoute";
import { connect } from "react-redux";
import Dashboard from "./component/Dashboard/Dashboard";
import Login from "./component/Login/Login";
import Loading from "./component/Loading/Loading";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = { data: "", token: "" };
  }
  render() {
    const { token, isLoginLoading, isLoggedIn } = this.props;
    if (isLoginLoading === true) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
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

const mapStateToPros = (state) => {
  console.log("Store From App: ", state);
  return {
    token: state.auth.token,
    isLoggedIn: state.auth.isLoggedIn,
    isLoginLoading: state.auth.isLoading,
  };
};

export default withRouter(connect(mapStateToPros)(App));
