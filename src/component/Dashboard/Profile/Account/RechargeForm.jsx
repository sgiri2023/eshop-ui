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

class RechargeForm extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }

  handleSubmit = (values, { setSubmitting }) => {
    let payload = {
      description: values.description,
      amount: values.amount,
      paymentMethod: "WALLET",
      toUserId: values.toUserId,
    };
    setSubmitting(true);
    console.log("Payload: ", payload);

    axios
      .post(`/api/wallet/recharge`, payload)
      .then((res) => {
        console.log(".......Account Recharge Response: ", res.data);
        this.props.onCancelModal();
        this.props.reloadList();
        setSubmitting(false);
      })
      .catch((err) => {
        console.log("Account Recharge Error: ", err);
        setSubmitting(false);
      });
  };

  componentDidMount() {}

  render() {
    const { buyerSellerList, buyerSellerListLoading } = this.props;

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
                        User List <span className="required">*</span>
                      </label>
                      <Select
                        name="toUserId"
                        value={values.toUserId ? values.toUserDetails : ""}
                        className="remitAutoSelect"
                        placeholder="Search Category"
                        isClearable={true}
                        onChange={(selectedOption) => {
                          setFieldValue(
                            "toUserId",
                            selectedOption && selectedOption.value
                              ? selectedOption.value.toString()
                              : ""
                          );
                          setFieldValue("toUserDetails", selectedOption);
                        }}
                        options={buyerSellerList.map((data) => {
                          return {
                            label:
                              data.isCustomer === true
                                ? "Buyer: " + data.firstName + " " + data.lastName
                                : "Seller: " + data.firstName + " " + data.lastName,
                            value: data.id,
                          };
                        })}
                        isLoading={buyerSellerListLoading}
                        isDisabled={false}
                      />
                      {errors.toUserId && touched.toUserId ? (
                        <span className="errorMsg">{errors.toUserId}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup controlId="formBasicText">
                      <label>
                        Recharge Amount <span className="required">*</span>
                      </label>
                      <Field
                        name="amount"
                        type="number"
                        className={`form-control`}
                        autoComplete="nope"
                        placeholder="Enter"
                        value={values.amount || ""}
                        disabled={false}
                      />
                      {errors.amount && touched.amount ? (
                        <span className="errorMsg">{errors.amount}</span>
                      ) : null}
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
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

export default RechargeForm;
