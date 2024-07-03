import { URL } from "./Variables"
import axios from "axios"


export const GetCountries = async () => {
    try {
        const response = await axios.get(`${URL}/Api/Country`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}