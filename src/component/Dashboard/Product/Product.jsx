import { Component } from "react";
import ProductCard from "./ProductCard/ProductCard";
import axios from "./../../../axiosClient/eaxios";
import { connect } from "react-redux";
import { Table, Button, Image, Modal } from "react-bootstrap";
import ProductFrom from "./ProductForm";
import { FiRefreshCcw } from "react-icons/fi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// FiRefreshCcw
class Product extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      productList: [],
      initialValues: "",

      productCategoryList: [],
      isProductCategoryListLoading: false,
      productSubCategoryList: [],
      isProductSubCategoryListLoading: false,
      productBrandList: [],
      isProductBrandListLoading: false,
      productModelList: [],
      isProductModelListLoading: false,
      isAddProductModelOpen: false,

      selectedCategoryId: 79,
      selectedSubCategoryId: 84,
      selectedBrandId: 100,
      selectedModelId: "",
    };
  }
  getProductList = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`/api/product/get-product-list`)
          .then((res) => {
            console.log(".......Product List: ", res.data);
            this.setState({
              productList: res.data,
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

  getAllProductModel = () => {
    this.setState(
      {
        isProductModelListLoading: true,
      },
      () => {
        axios
          .get(`/api/master-product/model/list`)
          .then((res) => {
            this.setState({
              productModelList: res.data,
              isProductModelListLoading: false,
            });
          })
          .catch((err) => {
            this.setState({
              isProductModelListLoading: false,
            });
          });
      }
    );
  };

  handleAddProductModal = () => {
    let initialValues = {
      modelName: "",
      modelVariant: "",
      categoryId: "",
      categoryDetails: "",
      subCategoryId: "",
      subCategoryDetails: "",
      brandId: "",
      brandDetails: "",
      modelId: "",
      modelDetails: "",
      mrp: "",
      productImageUrl: "",
      description: "",
      warranty: "",
      discountRate: 0,
      discountedPrice: 0,
      shippingCharge: 0,
      deliveryDays: 0,
      stockCount: 0,
      masterProductModelId: 0,
    };
    this.setState(
      {
        modalMode: "ADD",
        modalTitle: "Add Product ",
        initialValues,
      },
      () => {
        this.openAddProductModal();
      }
    );
  };

  openAddProductModal = () => {
    this.setState({
      isAddProductModelOpen: true,
    });
  };

  closeAddProductModal = () => {
    this.setState({
      isAddProductModelOpen: false,
    });
  };

  handleRefresh = () => {
    this.getProductList();
  };

  handleChange = () => {};

  componentDidMount() {
    this.getProductList();

    this.getAllProductCategory();
    this.getAllProductSubCategory();
    this.getAllProductBrand();
    this.getAllProductModel();
  }
  render() {
    const {
      productList,
      modalMode,
      modalTitle,
      initialValues,
      productCategoryList,
      isProductCategoryListLoading,
      productSubCategoryList,
      isProductSubCategoryListLoading,
      productBrandList,
      isProductBrandListLoading,
      productModelList,
      isProductModelListLoading,
      isAddProductModelOpen,
      selectedCategoryId,
      selectedSubCategoryId,
      selectedBrandId,
      selectedModelId,
    } = this.state;
    const { userDetails } = this.props;

    return (
      <div>
        {userDetails.isCustomer === false && (
          <Button onClick={() => this.handleAddProductModal()}>Add Product</Button>
        )}
        {/* <div className="refresh-icon">
          <FiRefreshCcw onClick={() => this.handleRefresh()} />
        </div> */}
        <div className="search-product d-flex align-items-center">
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <Select
              value={selectedCategoryId}
              onChange={this.handleChange}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Select Category</MenuItem>
              {productCategoryList.length > 0 &&
                productCategoryList.map((product) => (
                  <MenuItem value={product.id}>{product.displayName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <Select
              value={selectedSubCategoryId}
              onChange={this.handleChange}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Select Sub-Category</MenuItem>
              {productSubCategoryList.length > 0 &&
                productSubCategoryList.map((product) => (
                  <MenuItem value={product.id}>{product.displayName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={selectedBrandId}
              onChange={this.handleChange}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Select Brand</MenuItem>
              {productBrandList.length > 0 &&
                productBrandList.map((product) => (
                  <MenuItem value={product.id}>{product.brnadName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={selectedModelId}
              onChange={this.handleChange}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Select Model</MenuItem>
              {productModelList.length > 0 &&
                productModelList.map((product) => (
                  <MenuItem value={product.id}>{product.modelName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button onClick={() => this.handleRefresh()}>Search</Button>
        </div>
        <div className="product-list-container">
          {productList.length > 0 &&
            productList.map((product, index) => (
              <div className="product-container" key={index}>
                <ProductCard key={index} product={product} />
              </div>
            ))}
        </div>

        <Modal
          show={isAddProductModelOpen}
          onHide={this.closeAddProductModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductFrom
              mode={modalMode}
              initialValues={initialValues}
              onCancelModal={this.closeAddProductModal}
              reloadList={this.getProductList}
              productCategoryList={productCategoryList}
              isProductCategoryListLoading={isProductCategoryListLoading}
              productSubCategoryList={productSubCategoryList}
              isProductSubCategoryListLoading={isProductSubCategoryListLoading}
              productBrandList={productBrandList}
              isProductBrandListLoading={isProductBrandListLoading}
              productModelList={productModelList}
              isProductModelListLoading={isProductModelListLoading}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  console.log("Store from navbar: ", state);
  return {
    userDetails: state.userDetails.userDetails,
  };
};

export default connect(mapStateToPros)(Product);
