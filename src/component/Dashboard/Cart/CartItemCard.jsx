import { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { cartInfoAction } from "../../../store/slice/cart-slice";
import { AiFillDelete } from "react-icons/ai";

class CartItemCard extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }

  handleIncrement = (productId, index) => {
    let productList = [...this.props.cartDetails];
    let tempProductList = [];

    productList.map((product, pIndex) => {
      let tempProduct = { ...product };
      if (Number(product.id) === Number(productId) && pIndex === index) {
        tempProduct.purchaseQuantity = tempProduct.purchaseQuantity + 1;
      }
      tempProductList.push(tempProduct);
    });
    this.props.updateCart(tempProductList);
  };

  handleDecrement = (productId, index) => {
    let productList = [...this.props.cartDetails];
    let tempProductList = [];

    productList.map((product, pIndex) => {
      let tempProduct = { ...product };
      if (Number(product.id) === Number(productId) && pIndex === index) {
        if (tempProduct.purchaseQuantity <= 1) {
        } else {
          tempProduct.purchaseQuantity = tempProduct.purchaseQuantity - 1;
        }
      }
      tempProductList.push(tempProduct);
    });
    this.props.updateCart(tempProductList);
  };

  hanldeDeleteProduct = (productIndex) => {
    let productList = [...this.props.cartDetails];
    let index = productIndex;
    productList.splice(index, 1);
    this.props.updateCart(productList);
  };

  render() {
    const { cartItemDetails, index } = this.props;
    return (
      <div className="cart-item-container">
        <div className="product-image">
          <img src={cartItemDetails.productImageUrl} />
        </div>
        <div className="product-description">
          <div className="product-name">{cartItemDetails.modelName}</div>
          <div className="product-description">{cartItemDetails.variant}</div>
          <div className="seller-info">Seller: {cartItemDetails.sellerName}</div>
          <div className="price">
            {cartItemDetails.discountRate > 0 && (
              <span className="actual-price">
                <NumberFormat
                  value={cartItemDetails.marketRatePrice * cartItemDetails.purchaseQuantity}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandsGroupStyle={"thousand"}
                  renderText={(value) => <span> {value}</span>}
                />
              </span>
            )}{" "}
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
            {cartItemDetails.discountRate > 0 && (
              <span className="discount-rate">
                {cartItemDetails.discountRate}
                {"%"} off
              </span>
            )}
          </div>
        </div>
        <div className="quantity-control-container">
          <div className="delete-item" onClick={() => this.hanldeDeleteProduct(index)}>
            <AiFillDelete />
          </div>
          <div>in {cartItemDetails.deliveryDays} days</div>
          <button
            className="decrese-quantity"
            onClick={() => this.handleDecrement(cartItemDetails.id, index)}
          >
            {"-"}
          </button>
          <div className="input-qty">
            <input
              type="number"
              value={cartItemDetails.purchaseQuantity}
              onChange={(e) => {}}
              disabled={true}
            />
          </div>
          <button
            className="increase-quantity"
            onClick={() => this.handleIncrement(cartItemDetails.id, index)}
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
