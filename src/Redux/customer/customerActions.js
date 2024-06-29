import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignUpCustomer, LoginCustomer,UpdateCustomerInfo } from '../../Api/Customer';

export const signupCustomer = createAsyncThunk(
  'Customer/signup',
  async (CustomerData, thunkAPI) => {
    try {
      // 
      const response = await SignUpCustomer(CustomerData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginCustomer = createAsyncThunk(
  'Customer/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await LoginCustomer(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateCustomer = createAsyncThunk(
  'Customer/update',
  async (credentials, thunkAPI) => {
    try {
      const response = await UpdateCustomerInfo(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
