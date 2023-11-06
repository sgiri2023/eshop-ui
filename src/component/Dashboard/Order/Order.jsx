import { Component } from "react";
import axios from "./../../../axiosClient/eaxios";
import { connect } from "react-redux";
import OrderCard from "./OrderCard/OrderCard";
import RecetnOrder from "./RecentOrders/RecentOrders";
import OrderSummary from "./OrderSummary/OrderSummary";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
class Order extends Component {
  constructor() {
    super();
    this.state = { data: "", invoiceList: [], activeKey: "recentOrders" };
  }
  getInvoiceList = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`/api/invoice/buyer/get-invoice-list`)
          .then((res) => {
            console.log(".......Invoice List: ", res.data);
            this.setState({
              invoiceList: res.data,
              isLoading: false,
            });
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

  getOrderList = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`/api/invoice/seller/get-invoice-list`)
          .then((res) => {
            console.log(".......Order List: ", res.data);
            this.setState({
              invoiceList: res.data,
              isLoading: false,
            });
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
    console.log(".......Order Component Mounted:", this.props);
    if (this.props.userDetails.isCustomer === true) {
      this.getInvoiceList();
    } else {
      this.getOrderList();
    }
  }

  render() {
    const { invoiceList, activeKey } = this.state;
    return (
      <div className="order-card-container">
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => {
            this.setState({
              activeKey: k,
            });
          }}
          className="mb-3 horizoontal-tab"
          style={{ marginBottom: "0px !important" }}
        >
          <Tab eventKey="recentOrders" title="Recent Orders">
            <RecetnOrder />
          </Tab>
          <Tab eventKey="orderSummary" title="Order Summary">
            <OrderSummary />
          </Tab>
        </Tabs>
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

export default connect(mapStateToPros)(Order);
