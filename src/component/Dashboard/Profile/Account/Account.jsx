import { Component } from "react";
import BankCard from "./BankCard";
import TransactionLog from "./TransactionLog";
import axios from "./../../../../axiosClient/eaxios";
import { connect } from "react-redux";
import { Table, Button, Image, Modal } from "react-bootstrap";
import RechargeForm from "./RechargeForm";
import { accountInfoAction } from "../../../../store/slice/account-slice";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      isBankLoading: false,
      bankList: [],
      isTransactionLoading: false,
      transactionList: [],
      isRechargeModalOpen: false,
      buyerSellerListLoading: false,
      buyerSellerList: [],
      mode: "",
      modalTitle: "",
      initialValues: "",
    };
  }

  getBuyerSellerList = () => {
    this.setState(
      {
        buyerSellerListLoading: true,
      },
      () => {
        axios
          .get(`/api/user/buyer-seller/list`)
          .then((res) => {
            this.setState({
              buyerSellerList: res.data,
              buyerSellerListLoading: false,
            });
          })
          .catch((err) => {
            console.log("Error: ", err);
            this.setState({
              buyerSellerListLoading: false,
            });
          });
      }
    );
  };

  openRechargeModal = () => {
    this.setState({
      isRechargeModalOpen: true,
    });
  };

  closeRechargeModal = () => {
    this.setState({
      isRechargeModalOpen: false,
    });
  };

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
            this.props.updateAccountDetails(res.data);
            this.props.updateAccountDetailsLoadingState(false);
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

  handleOpenRechargeModal = () => {
    let initialValues = {
      amount: "",
      toUserId: "",
      toUserDetails: "",
      description: "",
    };
    this.setState(
      {
        mode: "ADD",
        modalTitle: "Recharge",
        initialValues,
      },
      () => {
        this.openRechargeModal();
      }
    );
  };

  componentDidMount() {
    this.setState({
      bankList: this.props.accountDetails.bankDetails,
    });
    this.getTransactionDetails();
    this.getBuyerSellerList();
  }
  render() {
    const {
      bankList,
      transactionList,
      isRechargeModalOpen,
      buyerSellerList,
      buyerSellerListLoading,
      mode,
      modalTitle,
      initialValues,
    } = this.state;
    const { userDetails } = this.props;

    return (
      <div className="account-container boxshadow_template_one">
        <div className="bank-card-container">
          {bankList.length > 0
            ? bankList.map((bank) => <BankCard bankDetails={bank} />)
            : "No records Found"}
          {userDetails.isAdmin === true && (
            <div className="recharge-button">
              <Button onClick={() => this.handleOpenRechargeModal()}>Recharge</Button>
            </div>
          )}
        </div>

        <div className="transaction-log-container">
          <TransactionLog transactionList={transactionList} />
        </div>

        <Modal
          show={isRechargeModalOpen}
          onHide={this.closeRechargeModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RechargeForm
              mode={mode}
              initialValues={initialValues}
              onCancelModal={this.closeRechargeModal}
              reloadList={this.getBankDetails}
              buyerSellerList={buyerSellerList}
              buyerSellerListLoading={buyerSellerListLoading}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return {
    accountDetails: state.accountDetails,
    userDetails: state.userDetails.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateAccountDetails: (data) => dispatch(accountInfoAction.updateAccoutDetails(data)),
    updateAccountDetailsLoadingState: (data) =>
      dispatch(accountInfoAction.updateAccoutLoading(data)),
  };
};
export default connect(mapStateToPros, mapDispatchToProps)(Account);
