import { URL } from "./Variables"
import axios from "axios"

export const AddShopingCartItem = async (ShopingCartItem) => {
    try {
        const response = await axios.post(`${URL}/Api/ShopingCartItem`, ShopingCartItem);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const IncreaseItemQuantity = async (shopingCartItemId) => {
    try {
        const response = await axios.patch(`${URL}/Api/ShopingCartItem/${shopingCartItemId}/increment`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const DecreaseItemQuantity = async (shopingCartItemId) => {
    try {
        const response = await axios.patch(`${URL}/Api/ShopingCartItem/${shopingCartItemId}/decrement`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const GetAllShopingCartItems = async (shopingCartId) => {
    try {
        const response = await axios.get(`${URL}/Api/ShopingCartItem/shopingcart/${shopingCartId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const DeleteShopingCartItem = async (shopingCartItemId) => {
    try {
        const response = await axios.delete(`${URL}/Api/ShopingCartItem/${shopingCartItemId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}