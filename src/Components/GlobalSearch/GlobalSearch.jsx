import React,{useState,useEffect} from "react";
import styles from "./GlobalSearch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {Modal,Form,Row,Col} from "react-bootstrap";
import {SearchGlobalProducts} from "../../Api/Product"
import ProductRow from "../ProductRow/ProductRow"

function GlobalSearch(props) {

  const [Products, setProducts] = useState([]);

    const handleProducts = async (e) => {
      try {
        if(e.target.value.trim()=="")
          {
            setProducts([]);
            return;
          }
        const results = await SearchGlobalProducts(e.target.value.trim());
        setProducts(results);
      } catch (error) {
        // throw error;
      }
    }

  return (
    <>
        <Modal show={props.show} fullscreen={true} onHide={() => props.setShow(false)}>
          <Modal.Header closeButton> 
          </Modal.Header>
          <Modal.Body>
            <Row>
                  <Col>
                    <Form.Control onChange={(e)=>handleProducts(e)} type="text" placeholder="Normal text" />
                  </Col>
            </Row>
            <div>
            {Array.isArray(Products) && Products?.length > 0 && 
            Products?.map((product) => (
                <ProductRow
                key={product?.ProductId}
                  id={product?.ProductId}
                  title={product?.ProductName}
                  description={product?.Description}
                  price={product?.Price}
                />
            ))}
            </div>
          </Modal.Body>
        </Modal>
      </>
  );
}

export default GlobalSearch;
