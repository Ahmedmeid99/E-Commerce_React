import React from "react";
import styles from "./CtegoryAccordion.module.css";
import { NavLink } from "react-router-dom";
import { Accordion, ListGroup } from "react-bootstrap";
function CtegoryAccordion({ categories }) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item className={styles.accordion} eventKey="0">
        <Accordion.Header>Categories</Accordion.Header>
        <Accordion.Body className="p-0 m-0 fs-6">
          <ListGroup className="border-0">
            {Array.isArray(categories) && categories?.length > 0 && 
            categories?.map((category) => (
              <ListGroup.Item key={category?.categoryId}>
                <NavLink to={`/Products/${category?.categoryId}`}>
                  {category?.categoryName}
                </NavLink>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default React.memo(CtegoryAccordion);
