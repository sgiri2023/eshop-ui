import { Component } from "react";
import OrderTable from "./OrderTable";

class RecetnOrder extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    return (
      <div className="recent-order-container">
        <OrderTable />
      </div>
    );
  }
}

export default RecetnOrder;
