import { Component } from "react";
import axios from "./../../../axiosClient/eaxios";
import { connect } from "react-redux";
import OrderCard from "./OrderCard/OrderCard";

class Order extends Component {
  constructor() {
    super();
    this.state = { data: "", invoiceList: [] };
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
    const { invoiceList } = this.state;
    return (
      <div className="order-card-container">
        {invoiceList.length > 0
          ? invoiceList.map((invoice, index) => (
              <div key={index}>
                <OrderCard order={invoice} />
              </div>
            ))
          : "No Oders Found"}
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
