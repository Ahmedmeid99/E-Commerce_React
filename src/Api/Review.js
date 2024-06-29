import { URL } from "./Variables"
import axios from "axios"

export const AddProductReview = async (newReview) => {
  try {
    const response = await axios.post(`${URL}/api/Review`, newReview);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteProductReview = async (customerId, reviewId) => {
  try {
    const response = await axios.delete(`${URL}/api/Review/customer/${customerId}/Review/${reviewId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const editProductReview = async (customerId, reviewId, revirewData) => {
  try {
    const response = await axios.put(`${URL}/api/Review/customer/${customerId}/Review/${reviewId}`, revirewData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const GetProductReviews = async (productId) => {
  try {
    const response = await axios.get(`${URL}/api/Review/product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const GetCustomerReviews = async (customerId) => {
  try {
    const response = await axios.get(`${URL}/api/Review/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
