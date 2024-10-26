import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { GetAllShopingCartItemsAC } from "../../Redux/shopingCart/shopingCartActions";
function Layout(props) {
  const { ShopingCart,ShopingCartItems } = useSelector((state) => state.shopingCart);
  // const shopingCartDispatch = useDispatch();

  // useEffect(() => {
  //   shopingCartDispatch(GetAllShopingCartItemsAC(ShopingCart?.shopingCartId));
  // }, [shopingCartDispatch]);
  return (
    <div>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
