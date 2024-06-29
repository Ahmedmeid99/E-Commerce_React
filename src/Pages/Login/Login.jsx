import React, { useReducer,useEffect } from "react";
import {
  Form,
  Button,
  FloatingLabel,
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert
} from "react-bootstrap";
import { loginCustomer } from "../../Redux/customer/customerActions";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import styles from "./Login.module.css";
import { Link ,useNavigate} from "react-router-dom";
// Initial state for the form
const initialState = {
  username: "",
  password: "",
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
  return errors;
};

const LogIn = () => {
   const navigate = useNavigate(); //

  const {isLogin ,loading, error } = useSelector((state) => state.customer);

  useEffect(() => {
    if (isLogin) {
      navigate('/Home'); //
    }
  }, [isLogin, navigate]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const Customer = {
    userName: state?.username,
    password: state?.password
  }
  const customerDispatch = useDispatch();
  const errors = useSelector((state) => state.customer.errors);


  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD_VALUE", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(state);
    if (Object.keys(errors).length > 0) {
      for (const field in errors) {
        dispatch({ type: "SET_ERROR", field, error: errors[field] });
      }
    } else {
      // Handle form submission
      // tell use that form submated succefuly (use Model)
      console.log("Form submitted successfully", Customer);
      customerDispatch(loginCustomer(Customer));
    }
  };

  return (
    <Container className={styles.login_component}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className={`${styles.form_card} p-4 mt-3 mb-3`}>
            <div className={styles.logo_box}>
              <FontAwesomeIcon className={styles.logo_icon} icon={faShop} />
            </div>
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

                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    className={`${styles.submit_btn} me-2`}
                    variant="primary"
                    type="submit"
                  >
                  {loading ? <Spinner animation="border" size="sm" /> : 'LogIn'}
                  </Button>
                  <div className="mt-3">
                    <span>Don't have an account? </span>
                    <Link to="/Signup">SignUp</Link>
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

export default LogIn;
