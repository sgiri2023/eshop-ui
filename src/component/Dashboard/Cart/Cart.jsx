import { Component } from "react";
import CartItemCard from "./CartItemCard";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import axios from "./../../../axiosClient/eaxios";
import { cartInfoAction } from "../../../store/slice/cart-slice";

class Cart extends Component {
  constructor() {
    super();
    this.state = { data: "", isSubmitting: false };
  }

  handleCalculateTotalPrice = () => {
    const { cartDetails } = this.props;
    let totalPrice = 0;
    cartDetails.map((cartItem) => {
      totalPrice = totalPrice + cartItem.marketRatePrice * cartItem.purchaseQuantity;
    });
    return totalPrice;
  };

  handleCalculateTotalDiscountedPrice = () => {
    const { cartDetails } = this.props;
    let totalPrice = 0;
    cartDetails.map((cartItem) => {
      totalPrice =
        totalPrice +
        (cartItem.marketRatePrice - cartItem.discountedPrice) * cartItem.purchaseQuantity;
    });
    return totalPrice;
  };

  handleCalculateTotalFinalPrice = () => {
    const { cartDetails } = this.props;
    let totalPrice = 0;
    cartDetails.map((cartItem) => {
      totalPrice = totalPrice + cartItem.discountedPrice * cartItem.purchaseQuantity;
    });
    return totalPrice;
  };

  handlePlaceOrder = () => {
    const { cartDetails, cartAddressId } = this.props;
    let invoiceRequestList = [];

    cartDetails.map((product) => {
      let invoiceRequest = {
        unitPrice: product.actualPrice,
        discountRate: product.discountRate,
        quantity: product.purchaseQuantity,
        taxRate: 0,
        shippingCharge: 0,
        productId: product.id,
        sellerId: product.sellerId,
        paymentMethod: "WALLET",
        addressId: cartAddressId,
      };
      invoiceRequestList.push(invoiceRequest);
    });

    let payload = {
      invoiceRequestList: invoiceRequestList,
    };

    console.log(".......Place Order Payload: ", payload);
    // this.props.updateCart([]);
    // this.props.history.push("/dashboard/order");
    this.setState(
      {
        isSubmitting: true,
      },
      () => {
        axios
          .post(`/api/invoice/create-bulk`, payload)
          .then((res) => {
            console.log(".......Invoice Created Successfully: ", res.data);
            this.props.updateCart([]);
            this.props.history.push("/dashboard/order");
            this.setState(
              {
                isSubmitting: false,
              },
              () => {}
            );
          })
          .catch((err) => {
            console.log("Error: ", err);
            this.setState({
              isSubmitting: false,
            });
          });
      }
    );
  };

  componentDidMount() {
    console.log(".......Cart Item Mounted: ", this.props);
  }
  render() {
    const { cartDetails, userAddressList, cartAddressId } = this.props;
    const { isSubmitting } = this.props;

    return (
      <div>
        {cartDetails.length > 0 && (
          <div className="address-list-container boxshadow_template_one">
            {userAddressList.length > 0
              ? userAddressList.map((address, index) => (
                  <div>
                    {cartAddressId === address.id && (
                      <div key={index} className="address-container">
                        <div className="address-tag">
                          {address.isDefault && <span className="tag">Default</span>}
                        </div>
                        <div className="address-fullname">{address.fullName}</div>
                        <div className="address-line">
                          {address.addressLineOne}
                          {", "}
                          {address.addressLineTwo}
                          {", "}
                          {address.state}
                          {", "}
                          {address.city}
                          {", "}
                          {address.pincode}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              : "No Address Found"}
          </div>
        )}

        <div className="cart-container">
          <div className="item-list-container boxshadow_template_one">
            {cartDetails.length > 0
              ? cartDetails.map((cartDetails, index) => (
                  <CartItemCard cartItemDetails={cartDetails} key={index} index={index} />
                ))
              : "Empty Cart"}
          </div>

          {cartDetails.length > 0 && (
            <div className="price-details-container boxshadow_template_one">
              <div className="price-heading">
                <span>Price Details</span>
              </div>
              <div className="price-wrapper">
                <div className="total-price price-section">
                  <span>Price ({cartDetails.length} items)</span>{" "}
                  <span className="amount">
                    <NumberFormat
                      value={this.handleCalculateTotalPrice()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      thousandsGroupStyle={"thousand"}
                      renderText={(value) => <span> {value}</span>}
                    />
                  </span>
                </div>
                <div className="discounted-price price-section">
                  <span>Discount</span>{" "}
                  <span className="discount-amount amount">
                    {"-"}
                    <NumberFormat
                      value={this.handleCalculateTotalDiscountedPrice()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      thousandsGroupStyle={"thousand"}
                      renderText={(value) => <span> {value}</span>}
                    />
                  </span>
                </div>
                <div className="discounted-price price-section">
                  <span>Delivery Charges</span>{" "}
                  <span className="discount-amount amount">{"Free"}</span>
                </div>
                <div className="final-price price-section">
                  <span>Total Amount</span>{" "}
                  <span>
                    <NumberFormat
                      value={this.handleCalculateTotalFinalPrice()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      thousandsGroupStyle={"thousand"}
                      renderText={(value) => <span> {value}</span>}
                    />
                  </span>
                </div>
              </div>
              <div className="place-order-button-container">
                {this.handleCalculateTotalFinalPrice() >
                  this.props.accountDetails.bankDetails[0].balance && (
                  <div className="insufficient-balance-message"> Insufficient Balance</div>
                )}
                <button
                  className="place-order-button"
                  disabled={
                    this.handleCalculateTotalFinalPrice() >
                    this.props.accountDetails.bankDetails[0].balance
                      ? true
                      : isSubmitting === true
                      ? true
                      : false
                  }
                  onClick={() => this.handlePlaceOrder()}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return {
    cartDetails: state.cartDetails.cartDetails,
    cartAddressId: state.cartDetails.addressId,
    accountDetails: state.accountDetails,
    userAddressList: state.userDetails.addressList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (data) => dispatch(cartInfoAction.updateCartDetails(data)),
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(Cart);
