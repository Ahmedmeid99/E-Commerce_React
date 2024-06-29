import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShopingCartBtn from "../ShopingCart/ShopingCartBtn/ShopingCartBtn";
import styles from "./Product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faDollarSign,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Product({ productId, productName, description, price, imageURL }) {
  const imgObj = {
    backgroundImage: `url(${imageURL})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "block",
    width: "100%",
    height: "180px",
  };
  return (
    <div className={styles.product_card}>
      <div className={styles.product_header}>
        <Link to={`/Products/ProductDetails/${productId}`}>
          <div style={imgObj} className={styles.product_img}></div>
        </Link>
      </div>
      <div className={styles.product_body}>
        <h5>{productName}</h5>
        <p>{description}</p>
        <div className={`${styles.product_action} flex`}>
          <div className={`${styles.price}`}>
            <FontAwesomeIcon icon={faDollarSign} />
            <span>{price}</span>
          </div>
          <ShopingCartBtn productId={productId} price={price}/>
          {/*pass product object*/}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Product);
