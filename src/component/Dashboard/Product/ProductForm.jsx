import { Component } from "react";
import {
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  Image,
  Modal,
} from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "./../../../axiosClient/eaxios";

class ProductFrom extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      populateSubCategoryList: [],
      populateBrandList: [],
      populateModelList: [],
    };
  }

  handlePopulateSubCategoryList = (id) => {
    const { productSubCategoryList } = this.props;
    let populatedList = [];
    populatedList = productSubCategoryList.filter((record) => {
      return Number(record.masterProductCategoryId) === Number(id);
    });

    this.setState({
      populateSubCategoryList: populatedList,
    });
  };

  handlePopulateBrandList = (id) => {
    const { productBrandList } = this.props;
    let populatedList = [];
    populatedList = productBrandList.filter((record) => {
      return Number(record.masterProductSubCategoryId) === Number(id);
    });

    this.setState({
      populateBrandList: populatedList,
    });
  };

  handlePopulateModelList = (id) => {
    const { productModelList } = this.props;
    let populatedList = [];
    populatedList = productModelList.filter((record) => {
      return Number(record.masterProductBrandId) === Number(id);
    });

    this.setState({
      populateModelList: populatedList,
    });
  };

  handlePropulateModel = (id, setFieldValue) => {
    const { productModelList } = this.props;
    let filterModel = [];
    filterModel = productModelList.filter((record) => {
      return Number(record.id) === Number(id);
    });
    console.log(".....Model : ", id, filterModel);
    if (filterModel.length > 0) {
      setFieldValue("modelName", filterModel[0].modelName);
      setFieldValue("modelVariant", filterModel[0].variant);
      setFieldValue("mrp", filterModel[0].marketRatePrice);
      setFieldValue("productImageUrl", filterModel[0].productImageUrl);
      setFieldValue("description", filterModel[0].description);
      setFieldValue("warranty", filterModel[0].warranty);
      setFieldValue("masterProductModelId", filterModel[0].id);
    }
  };

  handleSubmit = (values, { setSubmitting }) => {
    let payload = {
      discountRate: values.discountRate,
      shippingCharge: values.shippingCharge,
      deliveryDays: values.deliveryDays,
      description: values.description ? values.description : "",
      stockCount: values.stockCount,
      ratings: 0,
      masterProductModelId: values.masterProductModelId,
    };
    setSubmitting(true);
    console.log("Payload: ", payload);

    axios
      .post(`/api/product/add-from-master-product`, payload)
      .then((res) => {
        console.log(".......Add Product Response: ", res.data);
        this.props.onCancelModal();
        this.props.reloadList();
        setSubmitting(false);
      })
      .catch((err) => {
        console.log("Add Product Error: ", err);
        setSubmitting(false);
      });
  };

  componentDidMount() {
    console.log(".......Product Form Mounted: ", this.props);
  }

  render() {
    const { populateSubCategoryList, populateBrandList, populateModelList } = this.state;

    const {
      productCategoryList,
      isProductCategoryListLoading,
      productSubCategoryList,
      isProductSubCategoryListLoading,
      productBrandList,
      isProductBrandListLoading,
    } = this.props;

    return (
      <div>
        <Formik
          initialValues={this.props.initialValues}
          //validationSchema={editBankSchema}
          onSubmit={this.handleSubmit}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            setFieldValue,
            isValid,
          }) => {
            return (
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Category <span className="required">*</span>
                      </label>
                      <Select
                        name="categoryId"
                        value={values.categoryId ? values.categoryDetails : ""}
                        className="remitAutoSelect"
                        placeholder="Search Category"
                        isClearable={true}
                        onChange={(selectedOption) => {
                          setFieldValue(
                            "categoryId",
                            selectedOption && selectedOption.value
                              ? selectedOption.value.toString()
                              : ""
                          );
                          this.handlePopulateSubCategoryList(
                            selectedOption && selectedOption.value ? selectedOption.value : ""
                          );
                          setFieldValue("categoryDetails", selectedOption);
                          setFieldValue("subCategoryId", "");
                          setFieldValue("subCategoryDetails", "");
                          setFieldValue("brandId", "");
                          setFieldValue("brandDetails", "");
                        }}
                        options={productCategoryList.map((data) => {
                          return {
                            label: data.displayName,
                            value: data.id,
                          };
                        })}
                        isLoading={isProductCategoryListLoading}
                        isDisabled={false}
                      />
                      {errors.categoryId && touched.categoryId ? (
                        <span className="errorMsg">{errors.categoryId}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Sub-Category <span className="required">*</span>
                      </label>
                      <Select
                        name="subCategoryId"
                        value={values.categoryId ? values.subCategoryDetails : ""}
                        className="remitAutoSelect"
                        placeholder="Search Sub-Category"
                        isClearable={true}
                        onChange={(selectedOption) => {
                          setFieldValue(
                            "subCategoryId",
                            selectedOption && selectedOption.value ? selectedOption.value : ""
                          );
                          this.handlePopulateBrandList(
                            selectedOption && selectedOption.value ? selectedOption.value : ""
                          );
                          setFieldValue("subCategoryDetails", selectedOption);
                          setFieldValue("brandId", "");
                          setFieldValue("brandDetails", "");
                          setFieldValue("modelId", "");
                          setFieldValue("modelDetails", "");
                        }}
                        options={populateSubCategoryList.map((data) => {
                          return {
                            label: data.displayName,
                            value: data.id,
                          };
                        })}
                        isLoading={isProductSubCategoryListLoading}
                        isDisabled={values.categoryId ? false : true}
                      />
                      {errors.subCategoryId && touched.subCategoryId ? (
                        <span className="errorMsg">{errors.subCategoryId}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Brand <span className="required">*</span>
                      </label>
                      <Select
                        name="brandId"
                        value={values.brandId ? values.brandDetails : ""}
                        className="remitAutoSelect"
                        placeholder="Search Brand"
                        isClearable={true}
                        onChange={(selectedOption) => {
                          setFieldValue(
                            "brandId",
                            selectedOption && selectedOption.value
                              ? selectedOption.value.toString()
                              : ""
                          );
                          this.handlePopulateModelList(
                            selectedOption && selectedOption.value ? selectedOption.value : ""
                          );
                          setFieldValue("brandDetails", selectedOption);
                          setFieldValue("modelId", "");
                          setFieldValue("modelDetails", "");
                        }}
                        options={populateBrandList.map((data) => {
                          return {
                            label: data.brnadName,
                            value: data.id,
                          };
                        })}
                        isLoading={isProductSubCategoryListLoading}
                        isDisabled={values.subCategoryId ? false : true}
                      />
                      {errors.brandId && touched.brandId ? (
                        <span className="errorMsg">{errors.brandId}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  {console.log(".......Model List: ", populateModelList, this.props)}
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Models <span className="required">*</span>
                      </label>
                      <Select
                        name="modelId"
                        value={values.modelId ? values.modelDetails : ""}
                        className="remitAutoSelect"
                        placeholder="Search Model"
                        isClearable={true}
                        onChange={(selectedOption) => {
                          setFieldValue(
                            "modelId",
                            selectedOption && selectedOption.value
                              ? selectedOption.value.toString()
                              : ""
                          );
                          this.handlePropulateModel(
                            selectedOption && selectedOption.value ? selectedOption.value : "",
                            setFieldValue
                          );
                          setFieldValue("modelDetails", selectedOption);
                        }}
                        options={populateModelList.map((data) => {
                          return {
                            label: data.modelName,
                            value: data.id,
                          };
                        })}
                        isLoading={isProductBrandListLoading}
                        isDisabled={values.brandId ? false : true}
                      />
                      {errors.modelId && touched.modelId ? (
                        <span className="errorMsg">{errors.modelId}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Model Name <span className="required">*</span>
                      </label>
                      <Field
                        name="modelName"
                        type="text"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.modelName || ""}
                        disabled={true}
                      />
                      {errors.modelName && touched.modelName ? (
                        <span className="errorMsg">{errors.modelName}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Variant <span className="required">*</span>
                      </label>
                      <Field
                        name="modelVariant"
                        type="text"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.modelVariant || ""}
                        disabled={true}
                      />
                      {errors.modelVariant && touched.modelVariant ? (
                        <span className="errorMsg">{errors.modelVariant}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Market Rate Price (M.R.P) <span className="required">*</span>
                      </label>
                      <Field
                        name="mrp"
                        type="number"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.mrp || ""}
                        disabled={true}
                      />
                      {errors.mrp && touched.mrp ? (
                        <span className="errorMsg">{errors.mrp}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Product Image URL <span className="required">*</span>
                      </label>
                      <Field
                        name="productImageUrl"
                        type="text"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.productImageUrl || ""}
                        disabled={true}
                      />
                      {errors.productImageUrl && touched.productImageUrl ? (
                        <span className="errorMsg">{errors.productImageUrl}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Warranty <span className="required">*</span>
                      </label>
                      <Field
                        name="warranty"
                        type="number"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.warranty || ""}
                        disabled={true}
                      />
                      {errors.warranty && touched.warranty ? (
                        <span className="errorMsg">{errors.warranty}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Description <span className="required">*</span>
                      </label>
                      <Field
                        name="description"
                        type="text"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.description || ""}
                        disabled={true}
                      />
                      {errors.description && touched.description ? (
                        <span className="errorMsg">{errors.description}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Delivery Days <span className="required">*</span>
                      </label>
                      <Field
                        name="deliveryDays"
                        type="number"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.deliveryDays || ""}
                        disabled={false}
                      />
                      {errors.deliveryDays && touched.deliveryDays ? (
                        <span className="errorMsg">{errors.deliveryDays}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Stock Count <span className="required">*</span>
                      </label>
                      <Field
                        name="stockCount"
                        type="number"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.stockCount || ""}
                        disabled={false}
                      />
                      {errors.stockCount && touched.stockCount ? (
                        <span className="errorMsg">{errors.stockCount}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Discount Rate(%) <span className="required">*</span>
                      </label>
                      <Field
                        name="discountRate"
                        type="number"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.discountRate || ""}
                        onChange={(e) => {
                          let discountedPrice = 0;
                          discountedPrice =
                            Number(values.mrp) -
                            (Number(values.mrp) * Number(e.target.value)) / 100;
                          setFieldValue("discountRate", e.target.value);
                          setFieldValue("discountedPrice", discountedPrice);
                        }}
                        disabled={false}
                      />
                      {errors.discountRate && touched.discountRate ? (
                        <span className="errorMsg">{errors.discountRate}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Discounted Price <span className="required">*</span>
                      </label>
                      <Field
                        name="discountedPrice"
                        type="number"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.discountedPrice || ""}
                        disabled={true}
                      />
                      {errors.discountedPrice && touched.discountedPrice ? (
                        <span className="errorMsg">{errors.discountedPrice}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Shipping Charges <span className="required">*</span>
                      </label>
                      <Field
                        name="shippingCharge"
                        type="number"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.shippingCharge || ""}
                        disabled={false}
                      />
                      {errors.shippingCharge && touched.shippingCharge ? (
                        <span className="errorMsg">{errors.shippingCharge}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="text-center mr-t-20-imp">
                  <Col xs={12} md={12}>
                    <Button className="mr-lr-10" onClick={this.props.onCancelModal}>
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-confirm  mr-lr-10" disabled={isSubmitting}>
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default ProductFrom;
