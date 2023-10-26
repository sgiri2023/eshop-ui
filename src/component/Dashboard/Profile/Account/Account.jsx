import { Component } from "react";
import BankCard from "./BankCard";
import TransactionLog from "./TransactionLog";
import axios from "./../../../../axiosClient/eaxios";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      isBankLoading: false,
      bankList: [],
      isTransactionLoading: false,
      transactionList: [],
    };
  }

  getBankDetails = () => {
    this.setState(
      {
        isBankLoading: true,
        bankList: [],
      },
      () => {
        axios
          .get(`/api/wallet/details`)
          .then((res) => {
            this.setState({
              isBankLoading: false,
              bankList: res.data,
            });
          })
          .catch((err) => {
            console.log("Error: ", err);
            this.setState({
              isBankLoading: false,
            });
          });
      }
    );
  };

  getTransactionDetails = () => {
    this.setState(
      {
        isTransactionLoading: true,
        transactionList: [],
      },
      () => {
        axios
          .get(`/api/transaction/details`)
          .then((res) => {
            this.setState({
              isTransactionLoading: false,
              transactionList: res.data,
            });
          })
          .catch((err) => {
            console.log("Error: ", err);
            this.setState({
              isTransactionLoading: false,
            });
          });
      }
    );
  };

  componentDidMount() {
    this.getBankDetails();
    this.getTransactionDetails();
  }
  render() {
    const { bankList, transactionList } = this.state;
    return (
      <div className="account-container">
        <div className="bank-card-container">
          {bankList.length > 0
            ? bankList.map((bank) => <BankCard bankDetails={bank} />)
            : "No records Found"}
        </div>

        <div className="transaction-log-container">
          <TransactionLog transactionList={transactionList} />
        </div>
      </div>
    );
  }
}

export default Account;
