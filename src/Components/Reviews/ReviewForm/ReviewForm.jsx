import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Image } from "react-bootstrap";
import styles from "./ReviewForm.module.css";
import { useSelector } from "react-redux";

function ReviewForm({ productId, onAddReview, onUpdateReview, mode ,starsReview,textReview}) {
  const MAX_CHARS = 200;
  // customer
  // date (now)
  const { Customer } = useSelector((state) => state.customer);
  const [reviewText, setReviewText] = useState(textReview || "");
  const [stars, setStars] = useState(starsReview || 0);
  
  console.log(Customer);
  const handleAddedReview = () => {
    try {
      if(reviewText.trim()==""){
        return;
      }
      
      const Review = {
        CustomerId: Customer.CustomerId,
        ProductId: productId,
        ReviewText: reviewText,
        Rating: stars,
        ReviewDate: new Date().toISOString(),
      };
      onAddReview(Review);
      setReviewText("");
      setStars(0);
      // reset addReview component
    } catch (error) {
      // throw error;
    }
  };
  const handleUpdateReview=()=>{
    try {
      if(reviewText.trim()==""){
        return;
      }
      const updatedReview = {
        CustomerId: Customer.CustomerId,
        ReviewText: reviewText,
        Rating: stars,
        ReviewDate: new Date().toISOString(),
        ProductId: productId
      };
      console.log("work from addReview\n", updatedReview);
      onUpdateReview(updatedReview);
      // reset addReview component
    } catch (error) {
      // throw error;
    }
 
  }
  return (
    <Card className="my-4">
      <Card.Body className={styles.cardBody}>
        <Row className="mb-3 w-100">
          <Col>
            <Form >
              <Form.Group controlId="stars" className={styles.formGroup}>
                <div className="d-flex gap-2 justify-content-end">
                  {[...Array(5)].map((star, index) => (
                    <div
                      key={index}
                      className={
                        index < stars ? styles.gold_color : styles.grey_colo
                      }
                      onClick={() => setStars(index + 1)}
                    >
                      &#9733;
                    </div>
                  ))}
                </div>
              </Form.Group>
              <Form.Group controlId="reviewText" className={styles.formGroup}>
                <Form.Label className={"ms-3"}>Review</Form.Label>
                <Form.Control
                  className={styles.fullWidthTextarea}
                  as="textarea"
                  cols={3}
                  placeholder="Write your review"
                  value={reviewText}
                  maxLength={MAX_CHARS}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Card.Body>
      {mode == "Add" && (<Button onClick={handleAddedReview}>{`${mode} Review`}</Button>)}
      {mode == "Update" && (<Button onClick={handleUpdateReview}>{`${mode} Review`}</Button>)}
    </Card>
  );
}

export default React.memo(ReviewForm);
