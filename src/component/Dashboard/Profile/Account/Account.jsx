import { Component } from "react";
import BankCard from "./BankCard";
import TransactionLog from "./TransactionLog";
import axios from "./../../../../axiosClient/eaxios";
import { connect } from "react-redux";

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
    this.setState({
      bankList: this.props.accountDetails.bankDetails,
    });
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

const mapStateToPros = (state) => {
  return {
    accountDetails: state.accountDetails,
  };
};
export default connect(mapStateToPros)(Account);
