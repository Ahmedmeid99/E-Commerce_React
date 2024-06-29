import React from "react";
import { Card, Form, Button, Row, Col, Placeholder } from "react-bootstrap";

import styles from "./ReviewPlaceholder.module.css";
const ReviewPlaceholder = () => {
  return (
    <>
      <Card className={`${styles.review} my-2`}>
        <Card.Body className={styles.cardBody}>
          <div className="d-flex justify-content-between">
            <div className="d-flex mb-3">
              <div className={`${styles.formGroup} me-4`}>
                <Placeholder xs={8} />
              </div>
              <div className={styles.date}>
                <Placeholder xs={5} />
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              {[...Array(5)].map((star, index) => (
                <div key={index} className={styles.grey_colo} disabled>
                  &#9733;
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-between align-items-start">
            <div style={{ flexBasis: "90%" }}>
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ReviewPlaceholder;
