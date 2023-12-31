import React, { Suspense, lazy, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const Home = lazy(() => import("../component/Dashboard/Home/Home"));
const Order = lazy(() => import("../component/Dashboard/Order/Order"));
const Report = lazy(() => import("../component/Dashboard/Report/Report"));
const Product = lazy(() => import("../component/Dashboard/Product/Product"));
const Profile = lazy(() => import("../component/Dashboard/Profile/Profile"));

const DashboardRoute = () => {
  return (
    <Suspense
      fallback={
        <Fragment>
          <div>Loading...</div>
        </Fragment>
      }
    >
      <Switch>
        <Route path="/dashboard/home" render={(props) => <Home {...props} />} />
        <Route path="/dashboard/order" render={(props) => <Order {...props} />} />
        <Route path="/dashboard/report" render={(props) => <Report {...props} />} />
        <Route path="/dashboard/product" render={(props) => <Product {...props} />} />
        <Route path="/dashboard/profile" render={(props) => <Profile {...props} />} />
        <Redirect to="/dashboard/home" />
      </Switch>
    </Suspense>
  );
};

export default DashboardRoute;
