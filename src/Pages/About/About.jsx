import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './About.module.css';
import Layout from "../../Layouts/Layout/Layout"

const About = () => {
  const { Customer } = useSelector((state) => state.customer);
    const navigate = useNavigate(); //
    
  useEffect(() => {
    if (Customer == null) {
      navigate("/Login"); // must be in each page
    }
    },[navigate,Customer])

  return (
    <Layout>
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1>About Us</h1>
          <p className={styles.description}>
            Welcome to Our E-commerce Site! We are dedicated to providing you with the best online shopping experience. Our mission is to offer high-quality products at competitive prices while ensuring customer satisfaction.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h2>Our Mission</h2>
          <p className={styles.description}>
            Our mission is to make online shopping easy, enjoyable, and accessible for everyone. We strive to bring you the latest trends, reliable products, and exceptional customer service.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Meet the Team</h2>
          <Row>
            <Col md={4}>
              <Card className={styles.card}>
                <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
                <Card.Body>
                  <Card.Title>John Doe</Card.Title>
                  <Card.Text>CEO & Founder</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={styles.card}>
                <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
                <Card.Body>
                  <Card.Title>Jane Smith</Card.Title>
                  <Card.Text>Chief Marketing Officer</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={styles.card}>
                <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Team Member" />
                <Card.Body>
                  <Card.Title>Emily Johnson</Card.Title>
                  <Card.Text>Chief Technology Officer</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default About;
