import React, { useReducer, useState, useEffect } from "react";
import {
  Form,
  Button,
  FloatingLabel,
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signupCustomer } from "../../Redux/customer/customerActions";
import { GetCountries } from "../../Api/Country";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import styles from "./SignUp.module.css";

// Initial state for the form
const initialState = {
  username: "",
  password: "",
  gendor: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  address: "",
  countryId: 0,
  errors: {},
};

// Reducer function to handle form state
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    default:
      return state;
  }
};

// Validation function
const validate = (state) => {
  const errors = {};
  if (!state.username) errors.username = "Username is required";
  if (!state.password) errors.password = "Password is required";
  if (!state.gendor) errors.gendor = "gendor is required";
  if (!state.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
  if (!state.phone) errors.phone = "Phone is required";
  if (!state.email) errors.email = "Email is required";
  if (!state.address) errors.address = "Address is required";
  if (!state.countryId) errors.countryId = "Country is required";
  return errors;
};
const validatePhone =(phone)=>{
  const re = /^[0-9]{11}$/;
  return re.test(phone);
}

const validateEmail =(email)=>{
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const SignUp = () => {
  const customerDispatch = useDispatch();
  const navigate = useNavigate(); // استخدام useNavigate للتحويل

  const { isSignup, loading, error } = useSelector((state) => state.customer);

  useEffect(() => {
    if (isSignup) {
      navigate("/Login");
    }
  }, [isSignup, navigate]);

  const errors = useSelector((state) => state.customer.errors);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await GetCountries();
        setCountries(result);
      } catch (error) {
        throw error;
      }
    };
    fetchCountries();

    return () => {
      false;
    };
  }, []);

  const Customer = {
    userName: state?.username,
    password: state?.password,
    gendor: state?.gendor,
    dateOfBirth: state?.dateOfBirth,
    phone: state?.phone,
    email: state?.email,
    address: state?.address || null,
    countryID: state?.countryId,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD_VALUE", field: name, value });
  };

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_FIELD_VALUE",
      field: "countryId",
      value: Number(value),
    });
  };

  const handlePhonekeyPress =(e)=>{
    const charCode = e.charCode;
    if(charCode < 48 || charCode > 57){
      e.preventDefault();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!validateEmail(state.email)){
      dispatch({ type: "SET_ERROR", field:'email',  error:'Invalid email address' });
    }

    if(!validatePhone(state.phone)){
      dispatch({ type: "SET_ERROR", field:'phone', error:'Phone number must be 11 digits' });
    }

    const errors = validate(state);
    if (Object.keys(errors).length > 0) {
      for (const field in errors) {
        dispatch({ type: "SET_ERROR", field, error: errors[field] });
      }
    } else {
      // Handle form submission
      // tell use that form submated succefuly (use Model)
      console.log("Form submitted successfully", Customer);
      customerDispatch(signupCustomer(Customer));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className={`${styles.form_card} p-4 mt-3 mb-3`}>
            <div className={styles.logo_box}>
              <FontAwesomeIcon className={styles.logo_icon} icon={faShop} />
            </div>

            {/* <div className={styles.title}>Sign Up</div> */}
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <FloatingLabel
                  controlId="username"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                    isInvalid={!!state.errors.username}
                    placeholder="Username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    isInvalid={!!state.errors.password}
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="gendor" label="gendor">
                      <Form.Select
                        name="gendor"
                        value={state.gendor}
                        onChange={handleChange}
                        isInvalid={!!state.errors.gendor}
                      >
                        <option value="">Select...</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {state.errors.gendor}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="phone" label="Phone">
                      <Form.Control
                        type="text"
                        name="phone"
                        value={state.phone}
                        onChange={handleChange}
                        onKeyPress={handlePhonekeyPress}
                        isInvalid={!!state.errors.phone}
                        placeholder="Phone"
                      />
                      <Form.Control.Feedback type="invalid">
                        {state.errors.phone}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                </Row>

                <FloatingLabel controlId="email" label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    isInvalid={!!state.errors.email}
                    placeholder="Email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="address"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="address"
                    value={state.address}
                    onChange={handleChange}
                    isInvalid={!!state.errors.address}
                    placeholder="Address"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.address}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <FloatingLabel
                      controlId="dateOfBirth"
                      label="Date of Birth"
                    >
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={state.dateOfBirth}
                        onChange={handleChange}
                        isInvalid={!!state.errors.dateOfBirth}
                        placeholder="Date of Birth"
                      />
                      <Form.Control.Feedback type="invalid">
                        {state.errors.dateOfBirth}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6}>
                    <Card className="p-2">
                      <FloatingLabel
                        controlId="floatingcountryId"
                        label="Country"
                      >
                        <Form.Select
                          name="countryId"
                          value={state.countryId}
                          onChange={handleCountryChange}
                        >
                          <option value="">Select Country</option>
                          {countries?.map((country) => (
                            <option
                              key={country.countryID}
                              value={country.countryID}
                            >
                              {country.countryName}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {state.errors.countryId}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Card>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    className={`${styles.submit_btn} me-2`}
                    variant="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "SignUp"
                    )}
                  </Button>
                  <div className="mt-3">
                    <span>You have an account? </span>
                    <Link to="/Login">Login</Link>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
