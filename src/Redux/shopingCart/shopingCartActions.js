import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddShopingCart, GetShopingCart } from '../../Api/ShopingCart';
import { AddShopingCartItem, IncreaseItemQuantity, DecreaseItemQuantity, GetAllShopingCartItems, DeleteShopingCartItem } from '../../Api/ShopingCartItem';

export const AddShopingCartAC = createAsyncThunk(
    'ShopingCart/Add',
    async (ShopingCartData, thunkAPI) => {
        try {
            // 
            const response = await AddShopingCart(ShopingCartData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const GetShopingCartAC = createAsyncThunk(
    'ShopingCart/Get',
    async (customerId, thunkAPI) => {
        try {
            // 
            const response = await GetShopingCart(customerId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

);

// --------------------------------------------------------

export const AddShopingCartItemAC = createAsyncThunk(
    'ShopingCartItem/create',
    async (ShopingCartData, thunkAPI) => {
        try {
            // if exist incress by one
            const response = await AddShopingCartItem(ShopingCartData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

);

export const IncreaseShopingCartItemAC = createAsyncThunk(
    'ShopingCartItem/IncressByOne',
    async (shopingCartItemId, thunkAPI) => {
        try {
            // 
            const response = await IncreaseItemQuantity(shopingCartItemId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

);

export const DecreaseShopingCartItemAC = createAsyncThunk(
    'ShopingCartItem/DecressByOne',
    async (shopingCartItemId, thunkAPI) => {
        try {
            // 
            const response = await DecreaseItemQuantity(shopingCartItemId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

);

export const GetAllShopingCartItemsAC = createAsyncThunk(
    'ShopingCartItem/GetAll',
    async (shopingCartId, thunkAPI) => {
        try {
            // 
            const response = await GetAllShopingCartItems(shopingCartId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

);

export const DeleteShopingCartItemAC = createAsyncThunk(
    'ShopingCartItem/Delete',
    async (shopingCartItemId, thunkAPI) => {
        try {
            // 
            const response = await DeleteShopingCartItem(shopingCartItemId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

);