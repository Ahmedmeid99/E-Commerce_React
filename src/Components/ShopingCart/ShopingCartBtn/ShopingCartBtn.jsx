import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {
  AddShopingCartAC,
  AddShopingCartItemAC,
  IncreaseShopingCartItemAC
} from "../../../Redux/shopingCart/shopingCartActions";

import { useSelector, useDispatch } from "react-redux";
import styles from "./ShopingCartBtn.module.css";
function ShopingCartBtn({ productId, price }) {
  const { ShopingCart,ShopingCartItems, error } = useSelector((state) => state.shopingCart);
  const { Customer } = useSelector((state) => state.customer);
  const shopingCartDispatch = useDispatch();

  const handleClick = () => {
    if( ShopingCart == null){
        return;
    }
    if(ShopingCartItems != []){
      const cartItem = ShopingCartItems.find((item)=>item.productId==productId)
      if(cartItem){
        shopingCartDispatch(
          IncreaseShopingCartItemAC(cartItem?.shopingCartItemId)
        )
        return;
      }
    }
    
    //then
    const ShopingCartItem = {
      shopingCartId: ShopingCart.shopingCartId,
      productId: productId,
      quantity: 1,
      price: price,
      totalPrice: price,
    };
    
    shopingCartDispatch(AddShopingCartItemAC(ShopingCartItem));
    console.log("5", ShopingCartItem);
  };
  return (
    <div className={`${styles.btn_add_to_cart}`} onClick={handleClick}>
      <FontAwesomeIcon icon={faCartShopping} />
    </div>
  );
}

export default ShopingCartBtn;