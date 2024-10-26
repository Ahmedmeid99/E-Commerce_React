import React, { useState, useEffect } from "react";
import styles from "./CategoriesSection.module.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { GetCategories } from "../../Api/Category.js";
function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let results = await GetCategories();
        setCategories(results);
      } catch (error) {
        // throw error;
      }
    };
    fetchCategories();
  }, []); //categories

  return (
    <div className={`${styles.categories} container_app`}>
      <Row xs={2} lg={4} xl={5} className="g-4 ">
        {/* get categoies names and show them in h3 tag */}
        {/* you can use placeholder or skilton*/}
        {Array.isArray(categories) &&
              categories?.length > 0 &&
        categories?.map((category, index) => (
          <Col key={category?.categoryId}>
            <Link to={`Products/${category?.categoryId}`}>
              {category?.categoryName}
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default React.memo(CategoriesSection);
