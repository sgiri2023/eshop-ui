import { Component } from "react";
import NumberFormat from "react-number-format";

class BankCard extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    const { bankDetails } = this.props;
    return (
      <div>
        <div className="wallet-card">
          <div className="account-name">{bankDetails.name}</div>
          <div className="balance-title">{"Current Balance"}</div>
          <div className="balance">
            <NumberFormat
              value={bankDetails.balance}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
              decimalScale={2}
              fixedDecimalScale={true}
              thousandsGroupStyle={"thousand"}
              renderText={(value) => <span> {value}</span>}
            />
          </div>
          <div className="walled-id">{bankDetails.walletId}</div>
        </div>
      </div>
    );
  }
}

export default BankCard;
