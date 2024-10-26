import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Product from "../Product/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faDollarSign,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { GetTopCategoryProducts } from "../../Api/Product";
import { GetCategories } from "../../Api/Category";
import CategoryGroup from "../CategoryGroup/CategoryGroup";
//https://images.pexels.com/photos/16052344/pexels-photo-16052344/free-photo-of-photo-of-a-hand-holding-a-phone-with-a-delivery-app-on-screen.jpeg?auto=compress&cs=tinysrgb

function CategoryGroups() {
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesProducts = async () => {
      try {
        let results = await GetCategories();
        setCategories(results);
      } catch (error) {
        // throw error;
      }
    };
    fetchCategoriesProducts();
    
  }, []); // categories


  return (
    <>
    {Array.isArray(categories) && categories?.length > 0 && 
    categories?.map((category)=>(
      <CategoryGroup key={category.categoryId} category={category}/>
    
    ))}
    </>
  );
}

export default CategoryGroups;
