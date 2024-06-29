import { URL } from "./Variables"
import axios from "axios"

const api = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // هذا الخيار يضيف بيانات الاعتماد في الطلبات
});
export const SignUpCustomer = async (data) => {
  const response = await api.post(`/api/Customer`, data);
  return response.data;

}
export const LoginCustomer = async (data) => {
  const response = await api.post(`/api/Customer/login`, data);
  return response.data;

}

export const UpdateCustomerInfo = async (id, data) => {
  const response = await api.post(`/api/Customer/${id}`, data);
  return response.data;
}

/*
{
  "userName": "string",
  "password": "string",
  "gendor": "string",
  "dateOfBirth": "2024-06-15T00:31:04.724Z",
  "phone": "string",
  "email": "string",
  "address": "string",
  "countryID": 0
}
*/