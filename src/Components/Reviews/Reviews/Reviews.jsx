import React, { useEffect, useState } from 'react'
import { GetProductReviews } from '../../../Api/Review'
import Review from '../Review/Review'
import ReviewForm from '../ReviewForm/ReviewForm'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons' // FontAwesome icons
import ReviewPlaceholder from '../../Placeholder/ReviewPlaceholder/ReviewPlaceholder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AddProductReview,
  deleteProductReview,
  editProductReview,
} from '../../../Api/Review'
import { useSelector } from 'react-redux'

function Reviews({ productId }) {
  const { Customer } = useSelector((state) => state.customer)
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const results = await GetProductReviews(productId)
        setIsLoading(false)
        setReviews(results)
      } catch (error) {
        setIsLoading(false)
        // throw error;
      }
    }
    fetchReviews()
    return () => {
      false
    }
  }, [productId, location.pathname])

  const handleAddedReview = async (review) => {
    try {
      const newReview = await AddProductReview(review)
      console.log('from Reviews \n', newReview)
      setReviews([...reviews, newReview])
    } catch (error) {
      // throw error;
    }
  }
  const handleUpdateReview = async (reviewId, updatedReview) => {
    try {
      const returnReview = await editProductReview(
        Customer.CustomerId,
        reviewId,
        updatedReview
      )
      if (!returnReview) {
        // Show alert to indicate update failure
        return
      }

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.ReviewId === reviewId ? returnReview : review
        )
      )
    } catch (error) {
      // Handle error
    }
  }

  const handleDeleteReview = async (id) => {
    const DeletedReview = await deleteProductReview(Customer.CustomerId, id)
    if (DeletedReview == null) {
      // show alert to tell hem deleted action has not been deleted
    } else {
      setReviews(reviews.filter((review) => review.ReviewId != id))
    }
  }

  return (
    <>
      <ReviewForm
        productId={productId}
        onAddReview={handleAddedReview}
        mode="Add"
      />

      {isLoading &&
        reviews?.length == 0 &&
        Array.from({ length: 3 }).map((_, index) => (
          <ReviewPlaceholder key={index} />
        ))}
      {!isLoading && reviews?.length == 0 && (
        <div className="empty_content mb-5 pt=5">
          <FontAwesomeIcon icon={faCommentDots} />
          <h3>No Reviews</h3>
        </div>
      )}

      {!isLoading &&
        Array.isArray(reviews) &&
        reviews?.length > 0 &&
        reviews?.map((review) => (
          <Review
            key={review?.ReviewId}
            review={review}
            handleEdit={handleUpdateReview}
            handleDelete={handleDeleteReview}
          />
        ))}
    </>
  )
}

export default Reviews
