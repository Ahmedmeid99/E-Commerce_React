import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// import { fetchCustomer } from '../../Redux/customer/customerSlice'; // <= FIX
import { updateCustomer} from "../../Redux/customer/customerActions"
import { Form, Button, Row, Col } from 'react-bootstrap';

const CustomerInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Customer } = useSelector((state) => state.customer);
  const status = useSelector((state) => state.customer.status); // App Status // <= FIX
  const [formData, setFormData] = useState({
    userName: '',
    gendor: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '', // password countryId customerId
  });

   useEffect(() => { //ok
    if (Customer == null) {
      navigate("/Login"); // must be in each page
    }
    },[navigate,Customer])

  // useEffect(() => {
  //   dispatch(fetchCustomer(customerId));
  // }, [dispatch, customerId]);

  useEffect(() => {
    // fill form with customer data
    if (Customer) { //ok
      setFormData({
        userName: Customer.userName,
        gendor: Customer.gendor,
        phone: Customer.phone,
        email: Customer.email,
        address: Customer.address,
        dateOfBirth: Customer.dateOfBirth, // password countryId customerId
      });
    }
  }, [Customer]);

  const handleChange = (e) => { //ok
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => { //ok
    e.preventDefault();
    dispatch(updateCustomer(Customer.customerID,{ countryID: Customer.countryID,password:Customer.password, ...formData }));
  };

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (status === 'failed') {
  //   return <div>Error loading customer data</div>;
  // }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formuserName">
        <Form.Label>userName</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formgendor">
        <Form.Label>gendor</Form.Label>
        <Form.Control
          as="select"
          name="gendor"
          onChange={handleChange}
          value={formData.gendor}
          required
        >
          <option value="">Select gendor</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </Form.Control>
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Information
      </Button>
    </Form>
  );
};

export default CustomerInfo;
