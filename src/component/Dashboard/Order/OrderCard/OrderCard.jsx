import { Component } from "react";
import NumberFormat from "react-number-format";
import ProgressSteps from "../../../UI/ProgressSteps/ProgressSteps";

class OrderCard extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }

  componentDidMount() {}
  render() {
    const { order } = this.props;
    return (
      <div className="order-card boxshadow_template_one">
        <div className="product-image">
          <img src={order.productResponse.pictureUrl} />
        </div>
        <div className="product-description">
          <div className="product-name">{order.productResponse.name}</div>
          <div className="product-description">{order.productResponse.description}</div>
        </div>
        <div className="amount-section">
          <div className="paid-amount">
            <NumberFormat
              value={order.finalAmount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
              decimalScale={2}
              fixedDecimalScale={true}
              thousandsGroupStyle={"thousand"}
              renderText={(value) => <span> {value}</span>}
            />
          </div>
        </div>
        <div className="audit_trail-container">
          {order.auditResponseList.length > 0 &&
            order.auditResponseList.map((auditItem, index) => (
              <div key={index} className="audit-item">
                {auditItem.invoiceState}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default OrderCard;
