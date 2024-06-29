import React from "react";
import styles from "./ProductDetailsPlaceholder.module.css";
import { Placeholder, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
function ProductDetailsPlaceholder() {
  return (
    <>
      <div className={`${styles.product_component} container_app`}>
        <div className={`${styles.product_container} d-flex gap-4 mb-5 pb-5`}>
          <div className={styles.product_image}></div>
          <div className={`${styles.product_details} pt-5 podition-ralative`}>
            <h3 className="mb-3">
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={8} className="mb-2" />{" "}
              </Placeholder>
            </h3>
            <p className="fs-6">
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
            </p>
            <div className={`${styles.product_action} flex`}>
              <div className={`${styles.price}`}>
                <FontAwesomeIcon icon={faDollarSign} />
                <span>
                  <Placeholder xs={2} />
                </span>
              </div>
              <div className={styles.btn_add_to_cart}>
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(ProductDetailsPlaceholder);
