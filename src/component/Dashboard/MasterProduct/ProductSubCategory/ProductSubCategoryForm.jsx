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

class ProductSubCategoryForm extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }

  handleSubmit = (values, { setSubmitting }) => {
    let payload = {
      displayName: values.subCategoryName,
      masterProductCategoryId: Number(values.categoryId),
    };
    setSubmitting(true);
    console.log("Payload: ", payload);

    axios
      .post(`/api/master-product/sub-category/add`, payload)
      .then((res) => {
        console.log(".......Add Product Sub Category Response: ", res.data);
        this.props.onCancelModal();
        this.props.reloadList();
        setSubmitting(false);
      })
      .catch((err) => {
        console.log("Add Product Sub Category Error: ", err);
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
                          setFieldValue("categoryDetails", selectedOption);
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
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Sub-Category Name <span className="required">*</span>
                      </label>
                      <Field
                        name="subCategoryName"
                        type="text"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.subCategoryName || ""}
                        disabled={values.categoryId ? false : true}
                      />
                      {errors.subCategoryName && touched.subCategoryName ? (
                        <span className="errorMsg">{errors.subCategoryName}</span>
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

export default ProductSubCategoryForm;
