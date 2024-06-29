import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faFacebook,faLinkedin ,faTwitter  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`${styles.footer} py-4 mt-5`}>
      <Container>
        <Row className="align-items-end">
          <Col md={4}>
            <h6>Pages</h6>
            <ul className="list-unstyled">
              <li><a href="/about">About Page</a></li>
              <li><a href="/products">Products Page</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5>Follow Us</h5>
            <a href="https://facebook.com" className="text-white mx-2"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://twitter.com" className="text-white mx-2"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://linkedin.com" className="text-white mx-2"><FontAwesomeIcon icon={faTwitter} /></a>
          </Col>
          <Col md={4} className="text-md-right text-center">
            <p className="mb-0">© {new Date().getFullYear()} E-commerce </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
