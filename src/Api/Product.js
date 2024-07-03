import { URL } from "./Variables"
import axios from "axios"

export const GetProductCount = async (categoryId) => {
  try {
    const response = await axios.get(`${URL}/Api/Product/category/${categoryId}/count`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const GetAllCategoryProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${URL}/Api/Product/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const GetTopCategoryProducts = async (categoryId, count) => {
  try {
    const response = await axios.get(`${URL}/Api/Product/category/${categoryId}/top?count=${count}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const GetRelatedCategoryProducts = async (categoryId,ExcludedProduct, count) => {
  try {
    const response = await axios.get(`${URL}/Api/Product/category/${categoryId}/related?excludedProduct=${ExcludedProduct}&count=${count}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const GetProduct = async (ProductId) => {
  try {
    const response = await axios.get(`${URL}/Api/Product/${ProductId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const GetpaginatedCategoryProducts = async (categoryId, pageNumber, pageSize) => {
  try {
    const response = await axios.get(`${URL}/Api/Product/category/${categoryId}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const GetInRangeCategoryProducts = async (categoryId, min, max) => {
  try {
    const response = await axios.get(`${URL}/Api/Product/category/${categoryId}/inrange?min=${min}&max=${max}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const SearchCategoryProducts = async (categoryId, term) => {
  try {
    const response = await axios.get(`${URL}/Api/Product/category/${categoryId}/search?term=${term}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const SearchGlobalProducts = async (term) => {
  try {
    const response = await axios.get(`${URL}/Api/Product/searchglobal?term=${term}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}