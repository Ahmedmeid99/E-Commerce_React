import React, { useState, useEffect } from "react";

import {
  IncreaseShopingCartItemAC,
  DecreaseShopingCartItemAC,
  DeleteShopingCartItemAC,
} from "../../../Redux/shopingCart/shopingCartActions";
import { useSelector, useDispatch } from "react-redux";
import { GetProduct } from "../../../Api/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./ShopingCartItem.module.css";
const ShopingCartItem = ({ ShopingCartItem }) => {
  // const {shopingCartItemId,shopingCartId,productId,quantity,price,totalPrice} =shopingCartItem;
  const shopingCartDispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [imgObj, setImgObj] = useState({});
  const [isloadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    console.log("from shopingCartItem component", product);
    const fetchProductDetails = async () => {
      try {
        let foundedProduct = await GetProduct(ShopingCartItem?.ProductId);
        let backgroundImgStyle = {
          backgroundImage: `url(${foundedProduct?.ImageUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "block",
          width: "100%",
          height: "70px",
        };
        setLoadingProduct(false);
        setProduct(foundedProduct);
        setImgObj(backgroundImgStyle);
        console.log(foundedProduct);
      } catch (error) {
        setLoadingProduct(false);
        // throw error;
      }
    };

    fetchProductDetails();
    return () => {
      false;
    };
  }, [ShopingCartItem, location.pathname]); // add dependances ~ productId
  
  return (
    <li className={`flex ${styles.prduct_item}`}>
      <div className={`${styles.product_box} flex`}>
        <div className={styles.img_box}>
          {/* <img src="./images/product01.jpg" alt="Alternate Text" /> */}
          <div style={imgObj} className={`${styles.product_image}`}></div>
        </div>
        {/* .div > .product.productName */}
        <div className={styles.content}>
          <h6>{product?.ProductName}</h6>
          <p className={styles.description}>{product?.Description}</p>
        </div>
        <div className={`${styles.cart_item_contol} flex`}>
          <div className={styles.control_btn}>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() =>
                shopingCartDispatch(
                  IncreaseShopingCartItemAC(ShopingCartItem?.ShopingCartItemId)
                )
              }
            />{" "}
            {/* Increase Quantity*/}
          </div>
          <div className={styles.count}>{ShopingCartItem?.Quantity}</div>
          <div className={styles.control_btn}>
            <FontAwesomeIcon
              icon={faMinus}
              onClick={() =>
                shopingCartDispatch(
                  DecreaseShopingCartItemAC(ShopingCartItem?.ShopingCartItemId)
                )
              }
            />{" "}
            {/* Decrease Quantity*/}
          </div>
        </div>
        {/* <!-- must have price } ${  totalPrice --> */}
        <div>
          <div className={styles.total_price}>
            {ShopingCartItem?.Quantity == 1 ?"":`${ShopingCartItem?.Price * ShopingCartItem?.Quantity}$`}
          </div>
          <div className={styles.price}>{ShopingCartItem?.Price}$</div>
        </div>
      </div>
      <div className={styles.close_btn}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() =>
            shopingCartDispatch(
              DeleteShopingCartItemAC(ShopingCartItem?.ShopingCartItemId)
            )
          }
        />
      </div>
    </li>
  );
};

export default ShopingCartItem;
