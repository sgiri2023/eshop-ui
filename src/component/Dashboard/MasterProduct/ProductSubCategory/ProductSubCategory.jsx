import { Component } from "react";
import axios from "./../../../../axiosClient/eaxios";
import ProductSubCategoryForm from "./ProductSubCategoryForm";
import { Table, Button, Image, Modal } from "react-bootstrap";

class ProductSubCategory extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      record: [],
      isLoading: false,
      errorMessage: "",
      productCategoryList: [],
      isProductCategoryListLoading: false,
      isModalOpen: false,
      modalMode: "",
      modalTitle: "",
      initialValues: "",
    };
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

  getAllProductCategory = () => {
    this.setState(
      {
        isProductCategoryListLoading: true,
      },
      () => {
        axios
          .get(`/api/master-product/category/list`)
          .then((res) => {
            this.setState({
              productCategoryList: res.data,
              isProductCategoryListLoading: false,
            });
          })
          .catch((err) => {
            this.setState({
              isProductCategoryListLoading: false,
            });
          });
      }
    );
  };

  handleAddSubCategoryMasterProduct = () => {
    let initialValues = {
      categoryId: "",
      categoryDetails: "",
      subCategoryName: "",
    };
    this.setState(
      {
        modalMode: "ADD",
        modalTitle: "Add Product Sub-Category",
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
    this.getAllProductSubCategory();
    this.getAllProductCategory();
  }

  render() {
    const {
      record,
      productCategoryList,
      isProductCategoryListLoading,
      isModalOpen,
      modalMode,
      modalTitle,
      initialValues,
    } = this.state;
    return (
      <div className="boxshadow_template_one master-product-inner-container">
        <Button onClick={this.handleAddSubCategoryMasterProduct}>Add Sub-Category</Button>
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

        <Modal show={isModalOpen} onHide={this.handleCloseModal} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductSubCategoryForm
              mode={modalMode}
              initialValues={initialValues}
              onCancelModal={this.handleCloseModal}
              reloadList={this.getAllProductSubCategory}
              productCategoryList={productCategoryList}
              isProductCategoryListLoading={isProductCategoryListLoading}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ProductSubCategory;
