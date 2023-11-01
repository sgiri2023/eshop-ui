import { Component } from "react";
import ProductCard from "./ProductCard/ProductCard";
import axios from "./../../../axiosClient/eaxios";
import { connect } from "react-redux";
import { Table, Button, Image, Modal } from "react-bootstrap";
import ProductFrom from "./ProductForm";

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
    } = this.state;
    const { userDetails } = this.props;

    return (
      <div>
        {userDetails.isCustomer === false && (
          <Button onClick={() => this.handleAddProductModal()}>Add Product</Button>
        )}
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
