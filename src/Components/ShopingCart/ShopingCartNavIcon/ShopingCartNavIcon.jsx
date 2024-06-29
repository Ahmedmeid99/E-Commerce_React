import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  NavLink
} from "react-router-dom";
import {
  AddShopingCartAC,
  GetShopingCartAC,
  GetAllShopingCartItemsAC,
  } from "../../../Redux/shopingCart/shopingCartActions";
  import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from "./ShopingCartNavIcon.module.css";

function ShopingCartNavIcon({ onClickHandler }) {
  const { Customer } = useSelector((state) => state.customer);
  const shopingCartDispatch = useDispatch();
  const { ShopingCart, ShopingCartItems, error } = useSelector(
    (state) => state.shopingCart
  );

   useEffect(() => {
    //try get customer ShopingCart if field create one
    const fetchData = async () => {
      try {
        const result = await shopingCartDispatch(
          GetShopingCartAC(Customer?.customerID)
        );
        if (result.meta.requestStatus === "rejected") {
          await shopingCartDispatch(
            AddShopingCartAC({
              customerId: Customer.customerID,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
          );
        } else if (result.meta.requestStatus === "fulfilled") {
          await shopingCartDispatch(
            GetAllShopingCartItemsAC(result.payload.shopingCartId)
          );
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();

    console.log("catch ShopingCart", ShopingCart);
    console.log(error);
  }, [shopingCartDispatch]); // add dependances if you need
  console.log(Customer);
  console.log("Home", ShopingCart);
  console.log("Home : ", ShopingCartItems);

  return (
    <>
      <div className={styles.control_item} onClick={onClickHandler}>
        <NavLink className={`${styles.nav_icon} ${styles.cart_icon} `}>
          <FontAwesomeIcon icon={faCartShopping} />
        </NavLink>
        <div className={`${styles.cart_item_count} ${styles.is_empty_remove} `}>
          <span>{ShopingCartItems.length}</span>
        </div>
      </div>
    </>
  );
}

export default ShopingCartNavIcon;
