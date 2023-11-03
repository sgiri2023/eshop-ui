import { Component } from "react";
import { Table } from "react-bootstrap";
import NumberFormat from "react-number-format";

class TransactionLog extends Component {
  constructor() {
    super();
    this.state = { data: "" };
  }
  render() {
    const { transactionList } = this.props;
    return (
      <div className="transaction-log">
        <Table striped="columns" responsive="sm">
          <thead>
            <tr>
              <th>Reference Id</th>
              <th>From Account</th>
              <th>To Account</th>
              <th>Payment Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              {/* <th>description</th> */}
            </tr>
          </thead>
          <tbody>
            {transactionList.length > 0 ? (
              transactionList.map((transaction, index) => (
                <tr
                  key={index}
                  className={`${
                    transaction.transactionType.includes("DEBIT") ? "debit-cell" : "credit-cell"
                  }`}
                >
                  <td>
                    <div>{transaction.referenceNo}</div>
                    <div>Ref: {transaction.description}</div>
                  </td>
                  <td>{transaction.fromAccountName}</td>
                  <td>{transaction.toAccountName}</td>
                  <td>{transaction.processingDate}</td>
                  <td>
                    {transaction.transactionType.includes("DEBIT")
                      ? "Debit"
                      : transaction.transactionType.includes("CREDIT")
                      ? "Credit"
                      : transaction.transactionType}
                  </td>
                  <td>
                    <NumberFormat
                      value={transaction.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      thousandsGroupStyle={"thousand"}
                      renderText={(value) => <span> {value}</span>}
                    />
                  </td>
                  <td>
                    {transaction.transactionStatus === "COMPLETED"
                      ? "Completed"
                      : transaction.transactionStatus}
                  </td>
                  {/* <td>{transaction.description}</td> */}
                </tr>
              ))
            ) : (
              <td>
                <tr>{"No Records Found"}</tr>
              </td>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TransactionLog;
