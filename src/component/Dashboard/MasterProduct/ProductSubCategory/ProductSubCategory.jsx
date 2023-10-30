import { Component } from "react";
import axios from "./../../../../axiosClient/eaxios";
import { Table, Button } from "react-bootstrap";

class ProductSubCategory extends Component {
  constructor() {
    super();
    this.state = { data: "", record: [], isLoading: false, errorMessage: "" };
  }

  getAllProductSubCategory = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`/api/master-product/sub-category/list`)
          .then((res) => {
            this.setState({
              record: res.data,
              isLoading: false,
            });
          })
          .catch((err) => {
            this.setState({
              isLoading: false,
            });
          });
      }
    );
  };

  componentDidMount() {
    this.getAllProductSubCategory();
  }

  render() {
    const { record } = this.state;
    return (
      <div className="boxshadow_template_one master-product-inner-container">
        <Button>Add Sub-Category</Button>
        <div className="">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Created Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {record.length > 0
                ? record.map((data, index) => (
                    <tr key={index}>
                      <td>{data.categoryName}</td>
                      <td>{data.displayName}</td>
                      <td>{data.createdDate}</td>
                      <td>{data.isArchive === true ? "Inactive" : "Active"}</td>
                    </tr>
                  ))
                : "No Records Found"}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default ProductSubCategory;
