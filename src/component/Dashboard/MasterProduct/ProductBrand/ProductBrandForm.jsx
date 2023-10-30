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

class ProductBrandForm extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      populateSubCategoryList: [],
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

  handleSubmit = (values, { setSubmitting }) => {
    let payload = {
      brnadName: values.brandName,
      manufacturerDetails: values.manufacturerDetails,
      masterProductCategoryId: Number(values.categoryId),
      masterProductSubCategoryId: Number(values.subCategoryId),
    };
    setSubmitting(true);
    console.log("Payload: ", payload);

    axios
      .post(`/api/master-product/brand/add`, payload)
      .then((res) => {
        console.log(".......Add Product Brand Response: ", res.data);
        this.props.onCancelModal();
        this.props.reloadList();
        setSubmitting(false);
      })
      .catch((err) => {
        console.log("Add Product Brand Error: ", err);
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
                          setFieldValue("subCategoryDetails", selectedOption);
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
                        Brand Name <span className="required">*</span>
                      </label>
                      <Field
                        name="brandName"
                        type="text"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.brandName || ""}
                        disabled={false}
                      />
                      {errors.brandName && touched.brandName ? (
                        <span className="errorMsg">{errors.brandName}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Manufacturer Details <span className="required">*</span>
                      </label>
                      <Field
                        name="manufacturerDetails"
                        type="text"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.manufacturerDetails || ""}
                        disabled={false}
                      />
                      {errors.manufacturerDetails && touched.manufacturerDetails ? (
                        <span className="errorMsg">{errors.manufacturerDetails}</span>
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

export default ProductBrandForm;
