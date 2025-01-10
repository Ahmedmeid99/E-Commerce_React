import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./CategoryGroup.module.css";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import ProductPlaceholder from "../Placeholder/ProductPlaceholder/ProductPlaceholder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { GetTopCategoryProducts } from "../../Api/Product";

function CategoryGroup({ category }) {
  const [products, setProducts] = useState([]);
  const [runCount, setRunCount] = useState(0);
  const [styleObj, setStyleObj] = useState({});
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    if (runCount<2) { // Only fetch if not done yet

    const fetchData = async () => {
      try {
        let result = await GetTopCategoryProducts(category?.CategoryId, 5);
        console.log(result);
        setLoading(false);
        setProducts(result);
      } catch (error) {
        setLoading(false);
        // throw error;
      }
    };
    fetchData();
    setRunCount(runCount + 1); 

    let firstProduct = products?.length != 0 ? products[0] : {};
  const backgroundImgStyle = {
    backgroundImage: `linear-gradient(133deg, rgb(22 64 129), rgb(30 55 111 / 16%)),url(${firstProduct?.ImageUrl})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
  
    setStyleObj(backgroundImgStyle);
  ()=>{
  }   
   
  }
  

  }, [products]);


  return (
    <div className={"container_app mt-2 mb-5"}>
      {/* random product-img in the category */}
      <div style={styleObj} className={styles.category_img}>
        {/* CategoryName */}
        <h3 className={styles.category_name}>{category?.CategoryName}</h3>
      </div>
      {/* products.map(product) <Product/> */}
      <Row xs={2} md={3} xl={4} className="mt-1 ">
        {!isloading &&
          Array.isArray(products) && products?.length > 0 && 
          products?.slice(1).map((product) => (
            <Col className="p-1 m-0 p-sm-2" key={product?.ProductId}>
              <Product
                productId={product?.ProductId}
                productName={product?.ProductName}
                description={product?.Description}
                price={product?.Price}
                imageURL={product?.ImageUrl}
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
        to={`/Products/${category?.CategoryId}`}
        className={styles.to_category}
      >
        <button className={styles.btn_seemore}>See more</button>
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </div>
  );
}

export default CategoryGroup;
