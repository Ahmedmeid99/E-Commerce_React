import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { Form, Row, Col, Pagination, Breadcrumb } from "react-bootstrap";
import Product from "../../Components/Product/Product";
import ProductPlaceholder from "../../Components/Placeholder/ProductPlaceholder/ProductPlaceholder.jsx";
import {
  GetpaginatedCategoryProducts,
  GetProductCount,
  SearchCategoryProducts,
  GetInRangeCategoryProducts,
} from "../../Api/Product.js";
import { GetCategories, GetCategory } from "../../Api/Category.js";
import styles from "./Products.module.css";
import CtegoryAccordion from "../../Components/CtegoryAccordion/CtegoryAccordion";
import NavBarStatic from "../../Layouts/NavBarStatic/NavBarStatic";

function Products() {
  const { Customer } = useSelector((state) => state.customer);
  const navigate = useNavigate(); //
  const params = useParams();
  const pageSize = 8;
  let items = [];

  const [Products, setProducts] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [ProductsCount, setProductsCount] = useState(0);
  const [isShowPageNumbers, setIsShowPageNumbers] = useState(true);

  const [categories, setCategories] = useState([]);
  const [activeCategory, setAcitveCategory] = useState({});

  let MinValue = useRef(0);
  let MaxValue = useRef(0);
  
  useEffect(() => {
    if (Customer == null) {
      navigate("/Login"); // must be in each page
    }
    },[navigate,Customer])

  const ResetDefaultPageContent = async () => {
    try {
      setLoading(true);
      const defaultResult = await GetpaginatedCategoryProducts(
        params.CategoryId,
        activePageNumber,
        pageSize
      );
      setLoading(false);
      setIsShowPageNumbers(true);
      setProducts(defaultResult);
    } catch (error) {
      setLoading(false);
      // throw error;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await ResetDefaultPageContent();
    };
    const fetchProductsCount = async () => {
      try {
        let result = await GetProductCount(params.CategoryId);
        if (!result) {
          return;
        }
        setProductsCount(result);
      } catch (error) {
        // throw error;
      }
    };
    fetchProducts();
    fetchProductsCount();
    return () => {
      false;
    };
  }, [location.pathname, activePageNumber]); // and activePage

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
    return () => {
      false;
    };
  }, []);//categories

  useEffect(() => {
    const fetchActiveCategory = async () => {
      const result = await GetCategory(params.CategoryId);
      setAcitveCategory(result);
    };
    fetchActiveCategory();
    return () => {
      false;
    };
  }, [location.pathname]);

  useEffect(() => {
    // This will scroll to the top of the page whenever 'activePageNumber' changes
    window.scrollTo(0, 0);
  }, [activePageNumber]);

  // Reset Page Number to 1 after Reselect Category
  useEffect(() => {
    MinValue.current.value = null;
    MaxValue.current.value = null;
    setActivePageNumber(1);
    setIsShowPageNumbers(true);
  }, [location.pathname]);

  const handleClick = (number) => {
    setLoading(true);
    setActivePageNumber(number);
  };

  let pageCount = Math.ceil(ProductsCount / pageSize);
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePageNumber}
        onClick={() => handleClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleSearchForByKeyword = async (e) => {
    if (e.target.value.trim() == "") {
      await ResetDefaultPageContent();
      return;
    }

    const result = await SearchCategoryProducts(
      activeCategory.categoryId,
      e.target.value
    );
    setIsShowPageNumbers(false);
    setProducts(result);
  };
  const handleSearchForByMinMax = async () => {
    if (
      MaxValue.current.value.trim() == "" ||
      MinValue.current.value.trim() == ""
    ) {
      await ResetDefaultPageContent();
      return;
    }

    const result = await GetInRangeCategoryProducts(
      activeCategory.categoryId,
      MinValue.current.value,
      MaxValue.current.value
    );
    setIsShowPageNumbers(false);
    setProducts(result);
  };

  const handleSearchMinMax = async (e) => {
    if (e.target.value.trim() == "") {
      await ResetDefaultPageContent();
    }
  };
  return (
    <>
      <NavBarStatic />
      <div className={styles.breadcrumd}>
        <div className={"container_app"}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/Home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {activeCategory?.categoryName || "..."}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className={styles.products_container}>
        <div className={styles.acc_larg_screen}>
        <CtegoryAccordion
          categories={categories}
        />
        </div>
        <div className={styles.products_content}>
        <div className={styles.acc_small_screen}>
          <CtegoryAccordion
            categories={categories}
          />
          </div>
          <Row className={`${styles.row} g-1`}>
            <Col className="col-5">
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => handleSearchForByKeyword(e)}
              />
            </Col>
            <Col className="col-md-3">
              <Form.Control
                type="number"
                ref={MinValue}
                onChange={(e) => handleSearchMinMax(e)}
                placeholder="Min"
              />
            </Col>
            <Col className="col-md-3">
              <Form.Control
                type="number"
                ref={MaxValue}
                onChange={(e) => handleSearchMinMax(e)}
                placeholder="Max"
              />
            </Col>
            <Col className="col-md-1">
              <button
                onClick={handleSearchForByMinMax}
                className={`${styles.search_btn} btn`}
              >
                Search
              </button>
            </Col>
          </Row>

          <Row xs={2} md={3} lg={4} className="g-4 mt-1">
            {!isloading &&
              Array.isArray(Products) && Products?.length > 0 && 
              Products?.map((product, index) => (
                <Col key={index} className="">
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
              Array.from({ length: 8 }).map(
                (product, index) => (
                  <Col key={index} className="">
                    <ProductPlaceholder />
                  </Col>
                )
              )}
          </Row>

          {isShowPageNumbers && (
            <Pagination className={styles.paginate_component}>
              {items}
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
