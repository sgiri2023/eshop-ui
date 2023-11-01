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

class ProductCategoryForm extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }

  handleSubmit = (values, { setSubmitting }) => {
    let payload = {
      displayName: values.categoryName,
    };
    setSubmitting(true);
    console.log("Payload: ", payload);

    axios
      .post(`/api/master-product/category/add`, payload)
      .then((res) => {
        console.log(".......Add Product Category Response: ", res.data);
        this.props.onCancelModal();
        this.props.reloadList();
        setSubmitting(false);
      })
      .catch((err) => {
        console.log("Add Product Category Error: ", err);
        setSubmitting(false);
      });
  };

  componentDidMount() {}

  render() {
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
                        Category Name <span className="required">*</span>
                      </label>
                      <Field
                        name="categoryName"
                        type="text"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.categoryName || ""}
                        disabled={false}
                      />
                      {errors.categoryName && touched.categoryName ? (
                        <span className="errorMsg">{errors.categoryName}</span>
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

export default ProductCategoryForm;
