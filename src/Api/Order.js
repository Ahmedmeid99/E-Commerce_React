import { URL } from "./Variables"
import axios from "axios"

export const AddOrder = async (ShopingCartId) => {
    try {
        const response = await axios.post(`${URL}/Api/Order/${ShopingCartId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}