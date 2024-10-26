import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"; // FontAwesome icons
import { faPen } from "@fortawesome/free-solid-svg-icons"; // FontAwesome icons

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Review.module.css";
import { useSelector } from "react-redux";
import ReviewForm from "../ReviewForm/ReviewForm";
import IconRow from "../../IconRow/IconRow";
const Review = ({
  review,
  handleEdit,
  handleDelete
}) => {
  const { Customer } = useSelector((state) => state.customer);

  const [isShow,setIsShow]=useState(false);

  const handleUpdateReview=( updatedReview)=>{
    // the update logic
    handleEdit(review.ReviewId, updatedReview);
    setIsShow(false);
  }
  return (
    <>
      {!isShow&&<Card
        className={`${styles.review} ${
          review.CustomerId == Customer.customerID && styles.customer_review
        } my-2`}
      >
        <Card.Body className={styles.cardBody}>
          
          <div className="d-flex justify-content-between">
            <div className="d-flex mb-3">
              <div className={`${styles.formGroup} me-4`}> {review.CustomerName} </div>
              <div className={styles.date}> {review.ReviewDate.split("T")[0]}</div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              {[...Array(5)].map((star, index) => (
                <div
                  key={index}
                  className={
                    index < review.Rating ? styles.gold_color : styles.grey_colo
                  }
                  disabled
                >
                  &#9733;
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-between align-items-start">
            <div style={{ flexBasis: "90%" }}>{review.ReviewText}</div>
            <div style={{ flexBasis: "10%" }}>
              {review.CustomerId == Customer.customerID && (
                <Row className="justify-content-center gap-2 align-items-center my-3">
                  <Col xs="auto">
                    <Button variant="outline-primary" onClick={()=>setIsShow(true)}>
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{ fontSize: "12px" }}
                      />
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-danger" onClick={()=>handleDelete(review.ReviewId)}>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ fontSize: "12px" }}
                      />
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>}

      {isShow && <div></div>}
      {isShow &&<ReviewForm productId={review.ProductId} starsReview={review.Rating} textReview={review.ReviewText}  onUpdateReview={handleUpdateReview} mode="Update"/>}
    </>
  );
};

export default Review;
