import React, { useState } from "react";
import ShopingCart from "../../Components/ShopingCart/ShopingCart/ShopingCart";
import ShopingCartNavIcon from "../../Components/ShopingCart/ShopingCartNavIcon/ShopingCartNavIcon";
import UserMenue from "../../Components/UserMenue/UserMenue";
import styles from "./NavBarStatic.module.css";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";

const NavBarStatic = () => {
  const [shopingcartState, setShopingcartState] = useState(false);
  const [userMenueState, setUserMenueState] = useState(false);

  const handleOpenShopingcart = () => {
    setShopingcartState((prev) => !prev);
    setUserMenueState(false);
  };
  const handleOpenUserMenue = () => {
    setShopingcartState(false);
    setUserMenueState((prev) => !prev);
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className="container_app">
          <div className={`${styles.nav_container} flex`}>
            <div className={`${styles.nav_icon} ${styles.logo} `}>
              <FontAwesomeIcon icon={faShop} />
            </div>
          </div>

          {/* nav icons */}
          <div className={`${styles.action_controls} flex`}>
            <div
              className={`${styles.control_Account} ${styles.nav_icon}`}
              onClick={handleOpenUserMenue}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            <ShopingCartNavIcon onClickHandler={handleOpenShopingcart} />
            {/* <div
              className={styles.control_item}
              onClick={handleOpenShopingcart}
            >
              <div className={`${styles.nav_icon} ${styles.cart_icon} `}>
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
              <div
                className={`${styles.cart_item_count} ${styles.is_empty_remove} `}
              >
                <span>3</span>
              </div>
            </div> */}
          </div>

          {shopingcartState && <ShopingCart />}

          {userMenueState && <UserMenue />}
        </div>
      </header>
    </>
  );
};

export default React.memo(NavBarStatic);
