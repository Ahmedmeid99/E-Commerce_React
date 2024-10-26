import React, { Suspense } from "react";
import {
  Route, //select the path and eny component will render
  Routes, // never render two component in the same time onley the first path 
} from "react-router-dom";
import {Spinner} from "react-bootstrap"; 

const Home = React.lazy(() => import("./Pages/Home/Home"));
const About = React.lazy(() => import("./Pages/About/About"));
const CustomerInfo = React.lazy(() => import("./Pages/CustomerInfo/CustomerInfo"));

CustomerInfo
const Products = React.lazy(() => import("./Pages/Products/Products"));
const ProductDetails = React.lazy(
  () => import("./Pages/ProductDetails/ProductDetails")
);
const SignUp = React.lazy(() => import("./Pages/SignUp/SignUp"));
const Login = React.lazy(() => import("./Pages/Login/Login"));

import "./App.css";
function App() {
  return (
    <>
      <Suspense fallback={<div className="loading_component"><Spinner animation="border" size="sm" /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Products/:CategoryId" element={<Products />} />
          <Route
            path="/Products/ProductDetails/:ProductId"
            element={<ProductDetails />}
          />
          <Route path="/About" element={<About />} />
          <Route path="/Settings" element={<h1 className="not_completed">Not Completed</h1>} />
          <Route path="/CustomerInfo" element={<h1 className="not_completed">Not Completed</h1>} />
          <Route path="/ContentUs" element={<h1 className="not_completed">Not Completed</h1>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense> 
    </>
  );
}

export default App;
