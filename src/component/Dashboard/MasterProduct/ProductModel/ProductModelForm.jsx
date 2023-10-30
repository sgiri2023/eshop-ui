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
import axios from "./../../../../axiosClient/eaxios";

class ProductModelForm extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      populateSubCategoryList: [],
      populateBrandList: [],
    };
  }

  handlePopulateSubCategoryList = (categoryId) => {
    const { productSubCategoryList } = this.props;
    let populatedList = [];
    populatedList = productSubCategoryList.filter((record) => {
      return Number(record.masterProductCategoryId) === Number(categoryId);
    });

    this.setState({
      populateSubCategoryList: populatedList,
    });
  };

  handlePopulateBrandList = (categoryId) => {
    const { productBrandList } = this.props;
    let populatedList = [];
    populatedList = productBrandList.filter((record) => {
      return Number(record.masterProductSubCategoryId) === Number(categoryId);
    });

    this.setState({
      populateBrandList: populatedList,
    });
  };

  handleSubmit = (values, { setSubmitting }) => {
    let payload = {
      modelName: values.modelName,
      productImageUrl: values.productImageUrl,
      variant: values.modelVariant,
      description: values.description,
      marketRatePrice: values.mrp,
      masterProductCategoryId: Number(values.categoryId),
      masterProductSubCategoryId: Number(values.subCategoryId),
      masterProductBrandId: Number(values.brandId),
      warranty: values.warranty,
    };
    setSubmitting(true);
    console.log("Payload: ", payload);

    axios
      .post(`http://localhost:8090/api/master-product/model/add`, payload)
      .then((res) => {
        console.log(".......Add Product Model Response: ", res.data);
        this.props.onCancelModal();
        this.props.reloadList();
        setSubmitting(false);
      })
      .catch((err) => {
        console.log("Add Product Model Error: ", err);
        setSubmitting(false);
      });
  };

  componentDidMount() {}

  render() {
    const { populateSubCategoryList, populateBrandList } = this.state;

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
                          setFieldValue("brandDetails", selectedOption);
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
                        disabled={false}
                      />
                      {errors.warranty && touched.warranty ? (
                        <span className="errorMsg">{errors.warranty}</span>
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
                        disabled={false}
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
                        disabled={false}
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
                        disabled={false}
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
                        disabled={false}
                      />
                      {errors.productImageUrl && touched.productImageUrl ? (
                        <span className="errorMsg">{errors.productImageUrl}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
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
                        disabled={false}
                      />
                      {errors.description && touched.description ? (
                        <span className="errorMsg">{errors.description}</span>
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

export default ProductModelForm;
