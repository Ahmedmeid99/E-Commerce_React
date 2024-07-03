import { URL } from "./Variables"
import axios from "axios"

const api = axios.create({
  baseURL: URL,
});

export const GetCategories = async () => {
    try {
        const response = await api.get(`/Api/ProductCategory`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const GetCategory = async (categoryId) => {
    try {
        const response = await api.get(`/Api/ProductCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}