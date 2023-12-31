import { Component } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  isCustomer: true,
  formType: "SIGN_UP",
};

const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .test("firstName", "Special characters & numbers not allowed", function (value) {
      if (value) {
        let isValid = false;
        if (/^[A-Za-z-' ]+$/.test(value)) {
          isValid = true;
        }
        return isValid;
      }
      return true;
    })
    .required("First name is required"),
  lastName: yup
    .string()
    .test("lastName", "Special characters & numbers not allowed", function (value) {
      if (value) {
        let isValid = false;
        if (/^[A-Za-z-' ]+$/.test(value)) {
          isValid = true;
        }
        return isValid;
      }
      return true;
    })
    .required("First name is required")
    .required("Last name is required"),
  username: yup
    .string()
    .trim("Please remove whitespace")
    .email("Email must be valid")
    .strict()
    .required("Please enter email address"),
  password: yup
    .string()
    .trim("Please remove whitespace")
    .strict()
    .required("Please enter password"),
  // terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .trim("Please remove whitespace")
    .email("Email must be valid")
    .strict()
    .required("Please enter email address"),
  password: yup
    .string()
    .trim("Please remove whitespace")
    .strict()
    .required("Please enter password"),
  // terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

class Login extends Component {
  constructor() {
    super();
    this.state = { data: "", formType: "LOGIN", errorMessage: "" };
  }
  handleSubmitForm = (values) => {
    console.log(".......Values: ", values);
    this.props.history.push("/dashboard/home");
  };
  render() {
    const { formType, errorMessage } = this.state;
    return (
      <div className="login-container">
        <div className="login-card">
          <Row>
            <Col xs={12} md={6} className="left-section">
              <div className="login-image">
                <h1>Shop</h1>
                <p>Login to explore products</p>
              </div>
            </Col>
            <Col xs={12} md={6} className="right-section">
              <Formik
                validationSchema={formType === "SIGN_UP" ? signupSchema : loginSchema}
                onSubmit={this.handleSubmitForm}
                initialValues={initialValues}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  errors,
                  setFieldValue,
                  setFieldError,
                  setFieldTouched,
                  setErrors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <h1 className="title">{formType === "LOGIN" ? "Login" : "Sign Up"}</h1>
                    {errorMessage && (
                      <Alert key={"danger"} variant="danger">
                        {errorMessage}
                      </Alert>
                    )}
                    {formType === "SIGN_UP" && (
                      <Row>
                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                          <Form.Label>First name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            isInvalid={!!errors.firstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                          <Form.Label>Last name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            isInvalid={!!errors.lastName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                    )}
                    <Row>
                      <Form.Group as={Col} md="12" controlId="validationFormik01">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} md="12" controlId="validationFormik01">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="text"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    {formType === "SIGN_UP" && (
                      <Row style={{ marginTop: "5px" }}>
                        <Col>
                          <Form.Check
                            inline
                            label="Buyer"
                            name="group1"
                            type={"radio"}
                            id={`Buyer-1`}
                            checked={values.isCustomer}
                            onChange={(e) => {
                              if (e.target.checked === true) {
                                setFieldValue("isCustomer", true);
                              }
                            }}
                          />
                          <Form.Check
                            inline
                            label="Seller"
                            name="group1"
                            type={"radio"}
                            id={`Seller-2`}
                            checked={!values.isCustomer}
                            onChange={(e) => {
                              if (e.target.checked === true) {
                                setFieldValue("isCustomer", false);
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    )}
                    <Row className="control-section">
                      <Col xs={6} md={6}>
                        {formType === "LOGIN" ? (
                          <Button type="submit" variant="primary">
                            Login
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            variant="outline-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              setFieldError({});
                              this.setState({
                                formType: "LOGIN",
                              });
                            }}
                          >
                            Login
                          </Button>
                        )}
                      </Col>
                      <Col xs={6} md={6}>
                        {formType === "SIGN_UP" ? (
                          <Button type="submit" variant="primary">
                            Sign Up
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            variant="outline-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              setFieldError({});
                              this.setState({
                                formType: "SIGN_UP",
                              });
                            }}
                          >
                            Sign Up
                          </Button>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} md={12}></Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Login;
