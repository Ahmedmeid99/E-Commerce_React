import { URL } from "./Variables"
import axios from "axios"

export const AddShopingCart = async (shopingCart) => {
    try {
        const response = await axios.post(`${URL}/api/ShopingCart`, shopingCart);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const GetShopingCart = async (customerId) => {
    try {
        const response = await axios.get(`${URL}/api/ShopingCart/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
