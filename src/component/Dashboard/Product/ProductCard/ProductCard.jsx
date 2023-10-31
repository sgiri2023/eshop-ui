import { Component } from "react";
import NumberFormat from "react-number-format";
import { cartInfoAction } from "../../../../store/slice/cart-slice";
import { connect } from "react-redux";

class ProductCard extends Component {
  constructor() {
    super();
    this.state = { data: "", heart: 1, addbag: 1 };
  }

  Heart = () => {
    if (this.state.heart) {
      this.setState({
        heart: 0,
      });
    } else {
      this.setState({
        heart: 1,
      });
    }
  };

  handleAddToCart = (product, purchaseQuantity = 1) => {
    let modifyProduct = { ...product };
    modifyProduct.purchaseQuantity = purchaseQuantity;
    let currentCartDetails = [...this.props.cartDetails];
    currentCartDetails.push(modifyProduct);
    this.props.updateCart(currentCartDetails);
  };

  render() {
    const { heart, addbag } = this.state;
    const { product, key } = this.props;
    return (
      <div className="product-card-container">
        <div className="container" key={key}>
          <div className="card">
            <div className="top_part">
              <div className="circle">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <small>
                <i onClick={this.Heart} className={`fa ${heart ? "fa-heart-o" : "fa-heart"}`}></i>
              </small>
            </div>
            <div className="image">
              <img src={product.productImageUrl} />
            </div>
            <div className="vitamin">
              <p>{product.modelName}</p>
              <div className="rating" key={key}>
                <input
                  type="radio"
                  name={`${product.id}-5-rating`}
                  value={0}
                  id={`${product.id}-5`}
                  checked={product.ratings === 5 ? true : false}
                  disabled={true}
                />
                <label htmlFor={`${product.id}-5`}>☆</label>
                <input
                  type="radio"
                  name={`${product.id}-4-rating`}
                  value={0}
                  id={`${product.id}-4`}
                  checked={product.ratings === 4 ? true : false}
                  disabled={true}
                />
                <label htmlFor={`${product.id}-4`}>☆</label>
                <input
                  type="radio"
                  name={`${product.id}-3-rating`}
                  value={0}
                  id={`${product.id}-3`}
                  checked={product.ratings === 3 ? true : false}
                  disabled={true}
                />
                <label htmlFor={`${product.id}-3`}>☆</label>
                <input
                  type="radio"
                  name={`${product.id}-2-rating`}
                  value={0}
                  id={`${product.id}-2`}
                  checked={product.ratings === 2 ? true : false}
                  disabled={true}
                />
                <label htmlFor={`${product.id}-2`}>☆</label>
                <input
                  type="radio"
                  name={`${product.id}-1-rating`}
                  value={1}
                  id={`${product.id}-1`}
                  checked={product.ratings === 1 ? true : false}
                  disabled={true}
                />
                <label htmlFor={`${product.id}-1`}>☆</label>
              </div>
            </div>
            <div className="reviews">
              <p>{product.variant}</p>
              {/* <u>144 Views</u> */}
            </div>
            <div className="seller-info">Seller: {product.sellerName}</div>
            <div className="last_buttons">
              <div className="qty_btn">
                {/* <i className="fa fa-minus"></i>
                <p>{addbag}</p>
                <i className="fa fa-plus"></i> */}
              </div>
              <div className="money_bag">
                <p>
                  <strong>
                    <NumberFormat
                      value={product.discountedPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      thousandsGroupStyle={"thousand"}
                      renderText={(value) => <span> {value}</span>}
                    />
                  </strong>
                </p>

                <button onClick={() => this.handleAddToCart(product)}>
                  <i className="fa fa-shopping-bag"></i>Add to bag
                </button>
              </div>
            </div>
          </div>
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

export default connect(mapStateToPros, mapDispatchToProps)(ProductCard);
