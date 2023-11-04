import { Component } from "react";
import OrderTable from "./OrderTable";
import { connect } from "react-redux";
import SellerOrderTable from "./SellerOrderTable";
import AdminOrderTable from "./AdminOrderTable";
class RecetnOrder extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    const { userDetails } = this.props;
    return (
      <div className="recent-order-container">
        {userDetails && userDetails.isAdmin === false ? (
          userDetails.isCustomer === true ? (
            <OrderTable />
          ) : (
            <SellerOrderTable />
          )
        ) : (
          userDetails.isAdmin === true && <AdminOrderTable />
        )}
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  console.log("Store from navbar: ", state);
  return {
    userDetails: state.userDetails.userDetails,
  };
};

export default connect(mapStateToPros)(RecetnOrder);
