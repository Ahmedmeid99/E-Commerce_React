import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Hero from "../../Layouts/Hero/Hero";
import Layout from "../../Layouts/Layout/Layout";
import CategoriesSection from "../../Components/CategoriesSection/CategoriesSection";
import CategoryGroups from "../../Components/CategoryGroups/CategoryGroups";
import { GetShopingCart } from "../../Api/ShopingCart";

function Home() {
  const { Customer } = useSelector((state) => state.customer);
  const navigate = useNavigate(); //

  useEffect(() => {
    if (Customer == null) {
      navigate("/Login"); // must be in each page
    }
    },[navigate,Customer])

   
  return (
    <Layout>
      <Hero />
      <CategoriesSection />
      <CategoryGroups />
    </Layout>
  );
}

export default Home;
