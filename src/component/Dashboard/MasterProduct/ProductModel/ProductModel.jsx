import { Component } from "react";
import axios from "./../../../../axiosClient/eaxios";
import { Table, Button, Image, Modal } from "react-bootstrap";
import NumberFormat from "react-number-format";
import ProductModelForm from "./ProductModelForm";
import { formatDate } from "../../../../constant/Utils";

class ProductModel extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      record: [],
      isLoading: false,
      errorMessage: "",
      isAddModalOpen: false,
      modalMode: "",
      modalTitle: "",
      initialValues: "",

      productCategoryList: [],
      isProductCategoryListLoading: false,
      productSubCategoryList: [],
      isProductSubCategoryListLoading: false,
      productBrandList: [],
      isProductBrandListLoading: false,
      populateSubCategoryList: [],
      populateBrandList: [],
    };
  }

  getAllProductModel = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`/api/master-product/model/list`)
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

  handleAddModel = () => {
    let initialValues = {
      modelName: "",
      modelVariant: "",
      categoryId: "",
      categoryDetails: "",
      subCategoryId: "",
      subCategoryDetails: "",
      brandId: "",
      brandDetails: "",
      mrp: "",
      productImageUrl: "",
      description: "",
      warranty: "",
    };
    this.setState(
      {
        modalMode: "ADD",
        modalTitle: "Add Product Model",
        initialValues,
      },
      () => {
        this.handleOpenAddModelModal();
      }
    );
  };

  handleOpenAddModelModal = () => {
    this.setState({
      isAddModalOpen: true,
    });
  };

  handleCloseAddModelModal = () => {
    this.setState({
      isAddModalOpen: false,
      modalMode: "",
      modalTitle: "",
    });
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

  getAllProductBrand = () => {
    this.setState(
      {
        isProductBrandListLoading: true,
      },
      () => {
        axios
          .get(`/api/master-product/brand/list`)
          .then((res) => {
            this.setState({
              productBrandList: res.data,
              isProductBrandListLoading: false,
            });
          })
          .catch((err) => {
            this.setState({
              isProductBrandListLoading: false,
            });
          });
      }
    );
  };

  componentDidMount() {
    this.getAllProductCategory();
    this.getAllProductSubCategory();
    this.getAllProductBrand();
    this.getAllProductModel();
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
      productBrandList,
      isProductBrandListLoading,
    } = this.state;

    return (
      <div className="boxshadow_template_one master-product-inner-container">
        <Button onClick={() => this.handleAddModel()}>Add Model</Button>
        <div className="">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Brand Name</th>
                <th>Model Name</th>
                <th>Variant</th>
                <th>M.R.P</th>
                <th>Image</th>
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
                      <td>{data.brandName}</td>
                      <td>{data.modelName}</td>
                      <td>{data.variant}</td>
                      <td>
                        <NumberFormat
                          value={data.marketRatePrice}
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
                        <Image src={data.productImageUrl} height="40" />
                      </td>
                      <td>{data.createdDate && formatDate(new Date(data.createdDate))}</td>
                      <td>{data.isArchive === true ? "Inactive" : "Active"}</td>
                    </tr>
                  ))
                : "No Records Found"}
            </tbody>
          </Table>
        </div>

        <Modal
          show={isAddModalOpen}
          onHide={this.handleCloseAddModelModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductModelForm
              mode={modalMode}
              initialValues={initialValues}
              onCancelModal={this.handleCloseAddModelModal}
              reloadList={this.getAllProductModel}
              productCategoryList={productCategoryList}
              isProductCategoryListLoading={isProductCategoryListLoading}
              productSubCategoryList={productSubCategoryList}
              isProductSubCategoryListLoading={isProductSubCategoryListLoading}
              productBrandList={productBrandList}
              isProductBrandListLoading={isProductBrandListLoading}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ProductModel;
