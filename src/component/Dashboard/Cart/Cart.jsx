import { Component } from "react";
import CartItemCard from "./CartItemCard";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

class Cart extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }

  handleCalculateTotalPrice = () => {
    const { cartDetails } = this.props;
    let totalPrice = 0;
    cartDetails.map((cartItem) => {
      totalPrice = totalPrice + cartItem.actualPrice * cartItem.purchaseQuantity;
    });
    return totalPrice;
  };

  handleCalculateTotalDiscountedPrice = () => {
    const { cartDetails } = this.props;
    let totalPrice = 0;
    cartDetails.map((cartItem) => {
      totalPrice =
        totalPrice + (cartItem.actualPrice - cartItem.discountedPrice) * cartItem.purchaseQuantity;
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

  componentDidMount() {
    console.log(".......Cart Item Mounted: ", this.props);
  }
  render() {
    const { cartDetails, userAddressList, cartAddressId } = this.props;

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
                      : false
                  }
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

export default connect(mapStateToPros)(Cart);
