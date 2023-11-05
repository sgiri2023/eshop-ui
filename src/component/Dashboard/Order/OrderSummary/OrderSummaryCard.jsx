import { Component } from "react";

class OrderSummaryCard extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    return (
      <div className="order-summary-card-container">
        <div>Icon</div>
        <div></div>
      </div>
    );
  }
}

export default OrderSummaryCard;
