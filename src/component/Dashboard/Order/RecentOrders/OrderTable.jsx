import { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import axios from "./../../../../axiosClient/eaxios";

class OrderTable extends Component {
  constructor() {
    super();
    this.state = { data: "", invoiceList: [], activeKey: "orderSummary" };
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
    console.log(".......Order Table Component Mounted:", this.props);
    if (this.props.userDetails.isCustomer === true) {
      this.getInvoiceList();
    } else {
      this.getOrderList();
    }
  }

  render() {
    const { invoiceList } = this.state;
    return (
      <div className="order-table-container ">
        <div className="cus-table-header">
          <div className="header-item">Order Id</div>
          <div className="header-item">Seller</div>
          <div className="header-item">Item Name</div>
          <div className="header-item">Total Price</div>
          <div className="header-item">Status</div>
          <div className="header-item">Last Update</div>
          <div className="header-item">Exp. Delivery</div>
        </div>
        <div className="cus-table-body">
          {invoiceList.length > 0
            ? invoiceList.map((invoice) => (
                <div className="cus-table-row">
                  <div className="body-item">{invoice.orderId}</div>
                  <div className="body-item">{invoice.productResponse.sellerName}</div>
                  <div className="body-item model-section">
                    <img src={invoice.productResponse.productImageUrl} className="model-image" />{" "}
                    <span>{invoice.productResponse.modelName}</span>
                  </div>

                  <div className="body-item">
                    <NumberFormat
                      value={invoice.finalAmount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      thousandsGroupStyle={"thousand"}
                      renderText={(value) => <span> {value}</span>}
                    />
                  </div>

                  <div className="body-item">{invoice.invoiceState}</div>
                  <div className="body-item">{invoice.lastModifyDate}</div>
                  <div className="body-item">{invoice.deliveryDate}</div>
                </div>
              ))
            : "No Records Found"}
        </div>
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

export default connect(mapStateToPros)(OrderTable);
