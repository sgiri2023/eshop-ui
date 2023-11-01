import { Component } from "react";
import axios from "./../../../../axiosClient/eaxios";
import { Table, Button, Image, Modal } from "react-bootstrap";
import ProductCategoryForm from "./ProductCategoryForm";

class ProductCategory extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      record: [],
      isLoading: false,
      errorMessage: "",
      isModalOpen: false,
      modalMode: "",
      modalTitle: "",
      initialValues: "",
    };
  }

  getAllProductCategory = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`/api/master-product/category/list`)
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

  handleAddCategoryMasterProduct = () => {
    let initialValues = {
      categoryName: "",
    };
    this.setState(
      {
        modalMode: "ADD",
        modalTitle: "Add Product Category",
        initialValues,
      },
      () => {
        this.handleOpenModal();
      }
    );
  };

  handleOpenModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
      modalMode: "",
      modalTitle: "",
    });
  };

  componentDidMount() {
    this.getAllProductCategory();
  }

  render() {
    const { record, isModalOpen, modalMode, modalTitle, initialValues } = this.state;
    return (
      <div className="boxshadow_template_one master-product-inner-container">
        <Button onClick={this.handleAddCategoryMasterProduct}>Add Category</Button>
        <div className="">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Created Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {record.length > 0
                ? record.map((data, index) => (
                    <tr key={index}>
                      <td>{data.displayName}</td>
                      <td>{data.createdDate}</td>
                      <td>{data.isArchive === true ? "Inactive" : "Active"}</td>
                    </tr>
                  ))
                : "No Records Found"}
            </tbody>
          </Table>
        </div>

        <Modal show={isModalOpen} onHide={this.handleCloseModal} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductCategoryForm
              mode={modalMode}
              initialValues={initialValues}
              onCancelModal={this.handleCloseModal}
              reloadList={this.getAllProductCategory}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ProductCategory;
