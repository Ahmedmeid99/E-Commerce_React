import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner,Alert, Button  } from "react-bootstrap";
import {
  faTruckMoving,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  AddShopingCartAC,
  GetShopingCartAC,
  GetAllShopingCartItemsAC,
  } from "../../../Redux/shopingCart/shopingCartActions";
  import {ClearShopingCartItems} from "../../../Redux/shopingCart/shopingCartSlice"
import { AddOrder } from "../../../Api/Order.js"
import { useSelector ,useDispatch} from "react-redux";
import ShopingCartItem from "../ShopingCartItem/ShopingCartItem";
import styles from "./ShopingCart.module.css";

 function ShopingCart() {
  const { ShopingCartItems,ShopingCart ,ClearShopingCartItems} = useSelector((state) => state.shopingCart);
  const { Customer } = useSelector((state) => state.customer);
  const [isLoading,setLoading]=useState(false);
  const [isSended,setSended]=useState(false);
  const shopingCartDispatch = useDispatch();
  const CartDispatch = useDispatch();

  console.log(ShopingCartItems);

  useEffect(()=>{
    
  },[ShopingCartItems])

  const tryGetShopingCart = async() => {
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
    // useEffect(()=>{
    //   tryGetShopingCart();
    //   setSended(false);
    // },[ShopingCartItems,ShopingCart])
    

   const handleAddOrder = ()=>{
    try{
      setLoading(true);
      setSended(false);
      const result = AddOrder(ShopingCart.shopingCartId);// shopingCartId
      CartDispatch(ClearShopingCartItems());
      // Clear ShopingCartItems , ShopingCart
      setSended(true);
      if(result != null){
        tryGetShopingCart();
      console.log(result);
      }
      setLoading(false)

    }catch(error){
      setLoading(false);
    }

   }
  return (
    <div className={styles.shopping_cart}>
      {isSended&&<Alert variant="success" onClose={() => setSended(false)} dismissible>
        <Alert.Heading>Success!</Alert.Heading>
        <p>You order sended successfuly :)</p>
      </Alert>}
      <div className={styles.shopping_cart_Content}>
        <h4>Your shopping cart </h4>
        <ul className={styles.shopping_cart_items}>
          {/* map on shopingitems */}
          {Array.isArray(ShopingCartItems) &&
              ShopingCartItems?.length > 0 &&
          ShopingCartItems?.map((shopingCartItem,index)=>(<ShopingCartItem key={index} ShopingCartItem={shopingCartItem}/>))}
        </ul>
        <div className={`${styles.shopping_cart_footer} flex`}>
          <div className="flex">
            <span className={styles.trac_icon}>
              <FontAwesomeIcon icon={faTruckMoving} />
            </span>
            <p>
              Buy something at least for <span>150$</span> and you will have{" "}
              <span>FREE</span> shipping
            </p>
          </div>
          <button className={`${styles.checkout_btn} flex`} onClick={handleAddOrder}>
            <span className={styles.txt}>{isLoading ? <Spinner animation="border" size="sm" /> : 'Checkout'}</span>
            <span className={styles.move_to_icon}>
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ShopingCart;