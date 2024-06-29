import React from "react";
import { Row, Col, Card, Button, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./ProductPlaceholder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faDollarSign,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function ProductPlaceholder() {
  const imgObj = {
    display: "block",
    width: "100%",
    height: "180px",
  };
  return (
    <div className={styles.product_card}>
      <div className={styles.product_header}>
        <div style={imgObj} className={styles.product_img}></div>
      </div>
      <div className={styles.product_body}>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={8} className="mb-2" />{" "}
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <div className={`${styles.product_action} flex`}>
          <div className={`${styles.price}`}>
            <FontAwesomeIcon icon={faDollarSign} />
            <span>...</span>
          </div>
          <div className={styles.btn_add_to_cart}>
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductPlaceholder);
