import { Component } from "react";
import axios from "./../../../../axiosClient/eaxios";
import { Table, Button, Image, Modal } from "react-bootstrap";
import ProductBrandForm from "./ProductBrandForm";
class ProductBrand extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      record: [],
      isLoading: false,
      errorMessage: "",
      productCategoryList: [],
      isProductCategoryListLoading: false,
      productSubCategoryList: [],
      isProductSubCategoryListLoading: false,
      isAddModalOpen: false,
      modalMode: "",
      modalTitle: "",
      initialValues: "",
    };
  }

  getAllProductBrand = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`/api/master-product/brand/list`)
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

  getAllProductSubCategory = () => {
    this.setState(
      {
        isProductSubCategoryListLoading: true,
      },
      () => {
        axios
          .get(`/api/master-product/sub-category/list`)
          .then((res) => {
            this.setState({
              productSubCategoryList: res.data,
              isProductSubCategoryListLoading: false,
            });
          })
          .catch((err) => {
            this.setState({
              isProductSubCategoryListLoading: false,
            });
          });
      }
    );
  };

  handleAddBrand = () => {
    let initialValues = {
      brandName: "",
      manufacturerDetails: "",
      categoryId: "",
      categoryDetails: "",
      subCategoryId: "",
      subCategoryDetails: "",
    };
    this.setState(
      {
        modalMode: "ADD",
        modalTitle: "Add Product Brand",
        initialValues,
      },
      () => {
        this.handleOpenAddModal();
      }
    );
  };

  handleOpenAddModal = () => {
    this.setState({
      isAddModalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isAddModalOpen: false,
      modalMode: "",
      modalTitle: "",
    });
  };

  componentDidMount() {
    this.getAllProductCategory();
    this.getAllProductSubCategory();
    this.getAllProductBrand();
  }

  render() {
    const {
      record,
      isAddModalOpen,
      modalMode,
      modalTitle,
      initialValues,
      productCategoryList,
      isProductCategoryListLoading,
      productSubCategoryList,
      isProductSubCategoryListLoading,
    } = this.state;

    return (
      <div className="boxshadow_template_one master-product-inner-container">
        <Button onClick={this.handleAddBrand}>Add Brand</Button>
        <div className="">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Created Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {record.length > 0
                ? record.map((data, index) => (
                    <tr key={index}>
                      <td>{data.categoryName}</td>
                      <td>{data.subCategoryName}</td>
                      <td>{data.brnadName}</td>
                      <td>{data.manufacturerDetails}</td>
                      <td>{data.createdDate}</td>
                      <td>{data.isArchive === true ? "Inactive" : "Active"}</td>
                    </tr>
                  ))
                : "No Records Found"}
            </tbody>
          </Table>
        </div>

        <Modal
          show={isAddModalOpen}
          onHide={this.handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductBrandForm
              mode={modalMode}
              initialValues={initialValues}
              onCancelModal={this.handleCloseModal}
              reloadList={this.getAllProductBrand}
              productCategoryList={productCategoryList}
              isProductCategoryListLoading={isProductCategoryListLoading}
              productSubCategoryList={productSubCategoryList}
              isProductSubCategoryListLoading={isProductSubCategoryListLoading}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ProductBrand;
