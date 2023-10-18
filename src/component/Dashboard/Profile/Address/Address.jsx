import { Component } from "react";
import axios from "./../../../../axiosClient/eaxios";
import { AiOutlinePlus } from "react-icons/ai";

class Address extends Component {
  constructor() {
    super();
    this.state = { data: "", addressList: [], isLoading: false };
  }

  getAddressDetails = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`api/user/get-address-list`)
          .then((res) => {
            console.log(".......Address List: ", res.data);
            this.setState({
              addressList: res.data,
              isLoading: false,
            });
          })
          .catch((err) => {
            console.log("Error: ", err);
            this.setState({
              isLoading: false,
            });
          });
      }
    );
  };

  componentDidMount() {
    this.getAddressDetails();
  }
  render() {
    const { addressList } = this.state;
    return (
      <div>
        <div className="tab-title">Manage Addresses</div>

        <div className="addess-add-container">
          <AiOutlinePlus className="icon" /> <div className="title">ADD A NEW ADDRESS</div>
        </div>
        <div className="address-list-container">
          {addressList.length > 0
            ? addressList.map((address, index) => (
                <div key={index} className="address-container">
                  <div className="address-tag">
                    {address.isDefault && <span className="tag">Default</span>}
                  </div>
                  <div className="address-fullname">{address.fullName}</div>
                  <div className="address-line">
                    {address.addressLineOne}
                    {", "}
                    {address.addressLineTwo}
                    {", "}
                    {address.state}
                    {", "}
                    {address.city}
                    {", "}
                    {address.pincode}
                  </div>
                </div>
              ))
            : "No Records Found"}
        </div>
      </div>
    );
  }
}

export default Address;
