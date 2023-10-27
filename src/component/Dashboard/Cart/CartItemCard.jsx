import { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { cartInfoAction } from "../../../store/slice/cart-slice";

class CartItemCard extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  handleIncrement = (productId) => {
    let productList = [...this.props.cartDetails];
    let tempProductList = [];

    productList.map((product) => {
      let tempProduct = { ...product };
      if (Number(product.id) === Number(productId)) {
        tempProduct.purchaseQuantity = tempProduct.purchaseQuantity + 1;
      }
      tempProductList.push(tempProduct);
    });
    this.props.updateCart(tempProductList);
  };

  handleDecrement = (productId) => {
    let productList = [...this.props.cartDetails];
    let tempProductList = [];

    productList.map((product) => {
      let tempProduct = { ...product };
      if (Number(product.id) === Number(productId)) {
        if (tempProduct.purchaseQuantity <= 1) {
        } else {
          tempProduct.purchaseQuantity = tempProduct.purchaseQuantity - 1;
        }
      }
      tempProductList.push(tempProduct);
    });
    this.props.updateCart(tempProductList);
  };

  render() {
    const { cartItemDetails } = this.props;
    return (
      <div className="cart-item-container">
        <div className="product-image">
          <img src={cartItemDetails.pictureUrl} />
        </div>
        <div className="product-description">
          <div className="product-name">{cartItemDetails.name}</div>
          <div className="product-description">{cartItemDetails.description}</div>
          <div className="seller-info">Seller: {cartItemDetails.sellerName}</div>
          <div className="price">
            <span className="actual-price">
              <NumberFormat
                value={cartItemDetails.actualPrice * cartItemDetails.purchaseQuantity}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
                decimalScale={2}
                fixedDecimalScale={true}
                thousandsGroupStyle={"thousand"}
                renderText={(value) => <span> {value}</span>}
              />
            </span>{" "}
            <span className="discounted-price">
              <NumberFormat
                value={cartItemDetails.discountedPrice * cartItemDetails.purchaseQuantity}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
                decimalScale={2}
                fixedDecimalScale={true}
                thousandsGroupStyle={"thousand"}
                renderText={(value) => <span> {value}</span>}
              />
            </span>{" "}
            <span className="discount-rate">
              {cartItemDetails.discountRate}
              {"%"} off
            </span>
          </div>
        </div>
        <div className="quantity-control-container">
          <button
            className="decrese-quantity"
            onClick={() => this.handleDecrement(cartItemDetails.id)}
          >
            {"-"}
          </button>
          <div className="input-qty">
            <input type="number" value={cartItemDetails.purchaseQuantity} />
          </div>
          <button
            className="increase-quantity"
            onClick={() => this.handleIncrement(cartItemDetails.id)}
          >
            {"+"}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return {
    cartDetails: state.cartDetails.cartDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (data) => dispatch(cartInfoAction.updateCartDetails(data)),
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(CartItemCard);
