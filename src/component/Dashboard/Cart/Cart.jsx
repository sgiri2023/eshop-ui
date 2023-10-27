import { Component } from "react";
import CartItemCard from "./CartItemCard";
import { connect } from "react-redux";

class Cart extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  componentDidMount() {
    console.log(".......Cart Item Mounted: ", this.props);
  }
  render() {
    const { cartDetails } = this.props;
    return (
      <div className="cart-container">
        <div className="item-list-container boxshadow_template_one">
          {cartDetails.length > 0 &&
            cartDetails.map((cartDetails, index) => <CartItemCard cartItemDetails={cartDetails} />)}
        </div>
        <div className="price-details-container boxshadow_template_one">
          <div>Price Details</div>
          <div>Price: ({cartDetails.length} items)</div>
          <div>Discount: </div>
          <div>Total Amount: </div>
          <button>Place Order</button>
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

export default connect(mapStateToPros)(Cart);
