import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {Link} from "react-router-dom"
import styles from "./ProductRow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faDollarSign,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function ProductRow({id,title,description,price,imgUrl}) {
  const imgObj = {
    backgroundImage:`url(${imgUrl})`,
    backgroundPosition: "center",
    backgroundRepeat:"no-repeat",
    backgroundSize: "cover",
    display: "block",
    width: "150px",
    height: "100%",
    
    };
  return (
  <div className={styles.product_card}>
    <Link to={`/Products/ProductDetails/${id}`}>
            <div className={styles.product_body}>
                <h5>{title}</h5>
                <p>{description}</p>
                <div className={`${styles.product_action} flex`}>
                  <div className={`${styles.price}`}>
                    <FontAwesomeIcon icon={faDollarSign} />
                    <span>{price}</span>
                  </div>
                </div>
            </div>
    </Link>
    {/* <div className={styles.product_card}>
      <div className={styles.product_header}>
        <Link to={`/Products/ProductDetails/${id}`}>
          <div style={imgObj} className={styles.product_img} ></div>
        </Link>
      </div>
      <div className={styles.product_body}>
        <h5>{title}</h5>
        <p>{description}</p>
        <div className={`${styles.product_action} flex`}>
          <div className={`${styles.price}`}>
            <FontAwesomeIcon icon={faDollarSign} />
            <span>{price}</span>
          </div>
          <div className={styles.btn_add_to_cart}>
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
      </div>
    </div> */}
    </div>
  );
}

export default ProductRow ;
