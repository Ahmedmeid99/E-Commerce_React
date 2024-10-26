import { URL } from "./Variables"
import axios from "axios"

export const AddShopingCart = async (shopingCart) => {
    try {
        const response = await axios.post(`${URL}/Api/ShopingCart`, shopingCart);
        return response.data;
    } catch (error) {
         
        // throw error;
    }
}

export const GetShopingCart = async (customerId) => {
    try {
        const response = await axios.get(`${URL}/Api/ShopingCart/customer/${customerId}`);
        return response.data;
    } catch (error) {
         
        // throw error;
    }
}
