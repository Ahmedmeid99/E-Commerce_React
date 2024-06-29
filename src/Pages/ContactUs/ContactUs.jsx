import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ContactUs() {
    const { Customer } = useSelector((state) => state.customer);
    const navigate = useNavigate(); //
    
  useEffect(() => {
    if (Customer == null) {
      navigate("/Login"); // must be in each page
    }
    },[navigate,Customer])

  return (
    <div>CustomerInfo</div>
  )
}

export default ContactUs