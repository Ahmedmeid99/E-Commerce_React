import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"; // FontAwesome icons
import { faPen } from "@fortawesome/free-solid-svg-icons"; // FontAwesome icons

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconRow = ({ onEdit, onDelete }) => {
  return (
    <Row className="justify-content-center gap-2 align-items-center my-3">
      <Col xs="auto">
        <Button variant="outline-primary" onClick={onEdit}>
          <FontAwesomeIcon icon={faPen} style={{ fontSize: "12px" }} />
        </Button>
      </Col>
      <Col xs="auto">
        <Button variant="outline-danger" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: "12px" }} />
        </Button>
      </Col>
    </Row>
  );
};

export default IconRow;
