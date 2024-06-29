import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBarStatic from "../../Layouts/NavBarStatic/NavBarStatic";
import { Breadcrumb } from "react-bootstrap";
import { GetProduct, GetRelatedCategoryProducts } from "../../Api/Product";
import { useParams, Link } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { Row, Col, Card } from "react-bootstrap";
import Product from "../../Components/Product/Product";
import ShopingCartBtn from "../../Components/ShopingCart/ShopingCartBtn/ShopingCartBtn";

import ProductPlaceholder from "../../Components/Placeholder/ProductPlaceholder/ProductPlaceholder";
import ProductDetailsPlaceholder from "../../Components/Placeholder/ProductDetailsPlaceholder/ProductDetailsPlaceholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reviews from "../../Components/Reviews/Reviews/Reviews";
import {
  faDollarSign,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
function ProductDetails() {

  const { Customer } = useSelector((state) => state.customer);
  const navigate = useNavigate(); //
  const params = useParams();
  const [product, setProduct] = useState({});
  const [imgObj, setImgObj] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [isloadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    if (Customer == null) {
      navigate("/Login"); // must be in each page
    }
    },[navigate,Customer])

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        let foundedProduct = await GetProduct(params.ProductId);
        let backgroundImgStyle = {
          backgroundImage: `url(${foundedProduct?.imageURL})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        };
        setLoadingProduct(false);
        setProduct(foundedProduct);
        setImgObj(backgroundImgStyle);
        console.log(foundedProduct);
      } catch (error) {
        setLoadingProduct(false);
        throw error;
      }
    };

    fetchProductDetails();
    return () => {
      false;
    };
  }, [location.pathname]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        let result = await GetRelatedCategoryProducts(
          product?.categoryId,
          product?.productId,
          4
        );
        console.log(result);
        setLoading(false);
        setRelatedProducts(result);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    };
    fetchRelatedProducts();
    return () => {
      false;
    };
  }, [product]);

  useEffect(() => {
    // This will scroll to the top of the page whenever 'state' changes
    window.scrollTo(0, 0);
    setLoading(true);
  }, [product]);
  return (
    <>
      <NavBarStatic />
      <div className={styles.breadcrumd}>
        <div className={"container_app"}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/Home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/Products/${product.categoryId}`}>
                {product.categoryName || "..."}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active href="/ProductName">
              {product.productName || "..."}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className={`${styles.product_component} container_app`}>
        {isloadingProduct && <ProductDetailsPlaceholder />}
        {!isloadingProduct && (
          <div className={`${styles.product_container} d-flex gap-4 mb-5 pb-5`}>
            <div style={imgObj} className={`${styles.product_image}`}></div>
            <div className={`${styles.product_details} pt-5 podition-ralative`}>
              <div className={styles.product_content}>
                <h3 className="mb-3">{product.productName}</h3>
                <p className="fs-6">{product.description}</p>
              </div>
              <div className={`${styles.product_action} flex`}>
                <div className={`${styles.price}`}>
                  <FontAwesomeIcon icon={faDollarSign} />
                  <span>{product.price}</span>
                </div>
                <div className={styles.stock_number}>
                  <p>
                    {product.quantityInStock > 0 ? "In stock" : "Out stock"}
                  </p>
                  <span>{product.quantityInStock}</span>
                </div>
                <ShopingCartBtn
                  productId={product.productId}
                  price={product.price}
                />
              </div>
            </div>
          </div> 
        )}

        {/*  */}
        <div className={`${styles.related_products} mt-5 pb-5 mb-5 pb-5`}>
          <h4>Related Products</h4>
          <Row xs={2} md={3} xl={4} className="g-4 mt-1">
            {!isloading &&
              Array.isArray(relatedProducts) &&
              relatedProducts?.length > 0 &&
              relatedProducts?.map((product, idx) => (
                <Col key={idx}>
                  <Product
                    productId={product.productId}
                    productName={product.productName}
                    description={product.description}
                    price={product.price}
                    imageURL={product.imageURL}
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
        </div>
        {/*  */}
        <Reviews productId={product?.productId} />
      </div>
    </>
  );
}

export default ProductDetails;