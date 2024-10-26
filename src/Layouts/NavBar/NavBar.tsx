import React, { useState } from "react";
import ShopingCart from "../../Components/ShopingCart/ShopingCart/ShopingCart";
import ShopingCartNavIcon from "../../Components/ShopingCart/ShopingCartNavIcon/ShopingCartNavIcon";

import GlobalSearch from "../../Components/GlobalSearch/GlobalSearch";
import UserMenue from "../../Components/UserMenue/UserMenue"; 
import styles from "./NavBar.module.css";
import {
  Link, //add path to the link
} from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShop,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import Offcanvas from "react-bootstrap/Offcanvas";
const NavBar = () => {
  const [shopingcartState, setShopingcartState] = useState(false);
  const [userMenueState, setUserMenueState] = useState(false);
  const [searchState, setSearchState] = useState(false);

  const [showMenue, setShowMenue] = useState(false);
  const handleCloseMenue = () => setShowMenue(false);
  const handleShowMenue = () => setShowMenue(true);

  const handleOpenShopingcart = () => {
    setShopingcartState((prev) => !prev);
    setUserMenueState(false);
    setSearchState(false);
  };
  const handleOpenUserMenue = () => {
    setShopingcartState(false);
    setUserMenueState((prev) => !prev);
    setSearchState(false);
  };
  const handleOpenSearch = () => {
    setShopingcartState(false);
    setUserMenueState(false);
    setSearchState((prev) => !prev);
  };
  return (
    <>
      <header className={styles.navbar}>
        <div className="container_app">
          <div className={`${styles.nav_container} flex`}>
            <div className={`${styles.nav_icon} ${styles.logo} `}>
              <FontAwesomeIcon icon={faShop} />
            </div>

            <ul className={`${styles.nav_links} flex`}>
              <li>
                <Link to="/Products/2006">Products</Link>
              </li>
              <li>
                <Link to="/About">About us</Link>
              </li>
              <li>
                <Link to="/ContentUs">content</Link>
              </li>
            </ul>

            <div
              className={`${styles.nav_icon} ${styles.Bars_icon}`}
              onClick={handleShowMenue}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>

            <Offcanvas show={showMenue} onHide={handleCloseMenue} className={styles.menu_links_container}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <div className={`${styles.nav_icon} ${styles.logo}`}>
                    <FontAwesomeIcon icon={faShop} />
                  </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className={`${styles.menu_links}`}>
                  <li>
                    <Link to="/Products/2006">Products</Link>
                  </li>
                  <li>
                    <Link to="/About">About us</Link>
                  </li>
                  <li>
                    <Link to="/ContentUs">content</Link>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </div>

          {/* nav icons */}
          <div className={`${styles.action_controls} flex`}>
            <div
              className={`${styles.control_search_icon} ${styles.nav_icon} `}
              onClick={handleOpenSearch}
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div
              className={`${styles.control_Account} ${styles.nav_icon}`}
              onClick={handleOpenUserMenue}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            <ShopingCartNavIcon onClickHandler={handleOpenShopingcart} />
            
          </div>

          {shopingcartState && <ShopingCart />}

          {userMenueState && <UserMenue />}

          <GlobalSearch show={searchState} setShow={setSearchState} />
        </div>
      </header>
    </>
  );
};

export default React.memo(NavBar);
