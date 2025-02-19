import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner, Alert, Button } from "react-bootstrap";
import {
  faTruckMoving,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  AddShopingCartAC,
  AddOrderAC,
  GetShopingCartAC,
  GetAllShopingCartItemsAC,
} from "../../../Redux/shopingCart/shopingCartActions";
import { ClearShopingCartItems } from "../../../Redux/shopingCart/shopingCartSlice";
import { AddOrder } from "../../../Api/Order.js";
import { useSelector, useDispatch } from "react-redux";
import ShopingCartItem from "../ShopingCartItem/ShopingCartItem";
import styles from "./ShopingCart.module.css";
function ShopingCart() {
  const { ShopingCartItems, ShopingCart } = useSelector(
    (state) => state.shopingCart
  );
  const { Customer } = useSelector((state) => state.customer);
  const [isLoading, setLoading] = useState(false);
  const [isSended, setSended] = useState(false);
  const dispatch = useDispatch();

  console.log(ShopingCartItems);

  useEffect(() => {}, [ShopingCartItems]);

  const tryGetShopingCart = async () => {
    try {
      const result = await dispatch(GetShopingCartAC(Customer.CustomerId));
      if (result.meta.requestStatus === "rejected") {
        await dispatch(
          AddShopingCartAC({
            CustomerId: Customer.CustomerId,
            CreatedAt: new Date().toISOString(),
            UpdatedAt: new Date().toISOString(),
          })
        );
      } else if (result.meta.requestStatus === "fulfilled") {
        await dispatch(GetAllShopingCartItemsAC(result.payload.ShopingCartId));
      }
    } catch (error) {
      // throw error;
    }
  };

  const AddNewOrderAsync = async (shopingCartId) => {
    const result = await dispatch(AddOrderAC(shopingCartId)); // shopingCartId
    if (result.meta.requestStatus === "rejected") {
      return null;
    } else if (result.meta.requestStatus === "fulfilled") {
      return result;
    }
  };
  const [key, setKey] = useState(0);

  const refreshComponent = () => {
    setKey((prevKey) => prevKey + 1); // تغيير `key` سيؤدي إلى إعادة تحميل الكومبوننت
  };
  const handleAddOrder = async () => {
    try {
      setLoading(true);
      setSended(false);
      if (ShopingCartItems.length == 0) {
        setLoading(false);
        return;
      }
      const result = await AddNewOrderAsync(ShopingCart?.ShopingCartId); // shopingCartId
      // Clear ShopingCartItems , ShopingCart
      if (result != null) {
        setSended(true);
        console.log(1, result);
        // Create new Shoping cart after clear
        await dispatch(
          AddShopingCartAC({
            CustomerId: Customer.CustomerId,
            CreatedAt: new Date().toISOString(),
            UpdatedAt: new Date().toISOString(),
          })
        );
      }

      setLoading(false);
      console.log(2, result);
    } catch (error) {
      setLoading(false);
      console.log("3");
    }
  };
  return (
    <div className={styles.shopping_cart}>
      {isSended && (
        <Alert variant="success" onClose={() => setSended(false)} dismissible>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You order sended successfuly :)</p>
        </Alert>
      )}
      <div className={styles.shopping_cart_Content}>
        <h4>Your shopping cart </h4>
        <ul className={styles.shopping_cart_items}>
          {/* map on shopingitems */}
          {Array.isArray(ShopingCartItems) &&
            ShopingCartItems?.length > 0 &&
            ShopingCartItems?.map((shopingCartItem, index) => (
              <ShopingCartItem key={index} ShopingCartItem={shopingCartItem} />
            ))}
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
          <button
            className={`${styles.checkout_btn} flex`}
            onClick={handleAddOrder}
          >
            <span className={styles.txt}>
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Checkout"
              )}
            </span>
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
