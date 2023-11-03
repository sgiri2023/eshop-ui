import { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import axios from "./../../../../axiosClient/eaxios";
import { formatDate, getInvoiceState, readableDateFormat } from "../../../../constant/Utils";
import Dropdown from "react-bootstrap/Dropdown";
import { CiMenuKebab } from "react-icons/ci";
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

  getAdminAllInvoiceList = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`/api/invoice/admin/get-invoice-list`)
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

  handleInvoiceStateUpdate = (invoiceId, invoiceState) => {
    let payload = {
      invoiceState: invoiceState,
    };
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .put(`/api/invoice/update-state/${invoiceId}`, payload)
          .then((res) => {
            if (this.props.userDetails.isAdmin === false) {
              if (this.props.userDetails.isCustomer === true) {
                this.getInvoiceList();
              } else {
                this.getOrderList();
              }
            } else {
              this.getAdminAllInvoiceList();
            }
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
          {/* <div className="header-item">Last Update</div> */}
          <div className="header-item">Order Date</div>
          <div className="header-item">Exp. Delivery</div>
          <div className="header-item action-section">Action</div>
        </div>
        <div className="cus-table-body">
          {invoiceList.length > 0
            ? invoiceList.map((invoice) => (
                <div className="cus-table-row">
                  <div className="body-item break-line">{invoice.orderId}</div>
                  <div className="body-item">{invoice.productResponse.sellerName}</div>
                  <div className="body-item model-section">
                    <img src={invoice.productResponse.productImageUrl} className="model-image" />{" "}
                    <span>{invoice.productResponse.modelName}</span>
                  </div>

                  <div className="body-item final-price-section">
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
                    <div className="quantity-section">Oty: {invoice.quantity}</div>
                  </div>

                  <div className="body-item ">
                    <div className={`invoice-state ${invoice.invoiceState}`}>
                      {getInvoiceState(invoice.invoiceState)}
                    </div>
                  </div>
                  {/* <div className="body-item">
                    {invoice.lastModifyDate
                      ? readableDateFormat(new Date(invoice.lastModifyDate))
                      : ""}
                  </div> */}
                  <div className="body-item">
                    {invoice.createdDate ? readableDateFormat(new Date(invoice.createdDate)) : ""}
                  </div>
                  <div className="body-item">
                    {invoice.deliveryDate ? readableDateFormat(new Date(invoice.deliveryDate)) : ""}
                  </div>
                  <div className="body-item action-section">
                    {invoice.isInvoiceSettle === false && (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <CiMenuKebab />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {invoice.isInvoiceSettle === false && (
                            <Dropdown.Item
                              href="#"
                              onClick={() =>
                                this.handleInvoiceStateUpdate(invoice.id, "ORDER_CANCELLED_REQUEST")
                              }
                            >
                              Cancel
                            </Dropdown.Item>
                          )}
                          {invoice.isInvoiceSettle === true && (
                            <Dropdown.Item href="#">Return</Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
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
