import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./CategoryGroup.module.css";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import ProductPlaceholder from "../Placeholder/ProductPlaceholder/ProductPlaceholder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faDollarSign,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { GetTopCategoryProducts } from "../../Api/Product";
import { GetCategories } from "../../Api/Category";

function CategoryGroup({ category }) {
  const [products, setProducts] = useState([]);
  const [styleObj, setStyleObj] = useState({});
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await GetTopCategoryProducts(category?.categoryId, 5);
        console.log(result);
        setLoading(false);
        setProducts(result);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    let firstProduct = products?.length != 0 ? products[0] : {};
    const backgroundImgStyle = {
      backgroundImage: `linear-gradient(45deg, rgb(151 0 255 / 71%), rgb(230 0 255 / 61%)),url(${firstProduct?.imageURL})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    };
    setStyleObj(backgroundImgStyle);
  }, [products]);

  return (
    <div className={"container_app mt-2 mb-5"}>
      {/* random product-img in the category */}
      <div style={styleObj} className={styles.category_img}>
        {/* CategoryName */}
        <h3 className={styles.category_name}>{category?.categoryName}</h3>
      </div>
      {/* products.map(product) <Product/> */}
      <Row xs={2} md={3} xl={4} className="g-4 mt-1">
        {!isloading &&
          Array.isArray(products) && products?.length > 0 && 
          products?.slice(1).map((product, idx) => (
            <Col key={idx}>
              <Product
                productId={product?.productId}
                productName={product?.productName}
                description={product?.description}
                price={product?.price}
                imageURL={product?.imageURL}
              />
            </Col>
          ))}
        {isloading &&
          Array.from({ length: 4 }).map((product, index) => (
            <Col key={index} className="">
              <ProductPlaceholder />
            </Col>
          ))}
      </Row>
      <Link
        to={`/Products/${category.categoryId}`}
        className={styles.to_category}
      >
        <button className={styles.btn_seemore}>See more</button>
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </div>
  );
}

export default CategoryGroup;
