// ShopingCartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { AddShopingCartAC,AddOrderAC, GetShopingCartAC, AddShopingCartItemAC, IncreaseShopingCartItemAC, DecreaseShopingCartItemAC, GetAllShopingCartItemsAC, DeleteShopingCartItemAC } from './shopingCartActions';

const initialState = {
    ShopingCart: null,
    ShopingCartItems: [],
    loading: false,
    error: null,
};

const shopingCartSlice = createSlice({
    name: 'shopingCart',
    initialState,
    reducers: {
        

    },
    extraReducers: (builder) => {
        builder
            .addCase(AddShopingCartAC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddShopingCartAC.fulfilled, (state, action) => {
                state.loading = false;
                state.ShopingCartItems = [];
                state.ShopingCart = action.payload;
            })
            .addCase(AddShopingCartAC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AddOrderAC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddOrderAC.fulfilled, (state, action) => {
                state.loading = false;
                state.ShopingCartItems = [];
                state.ShopingCart = null;
            })
            .addCase(AddOrderAC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetShopingCartAC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetShopingCartAC.fulfilled, (state, action) => {
                state.loading = false;
                state.ShopingCart = action.payload;
            })
            .addCase(GetShopingCartAC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AddShopingCartItemAC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddShopingCartItemAC.fulfilled, (state, action) => {
                if (!Array.isArray(state.ShopingCartItems)) {
                    state.ShopingCartItems = [];
                }
                state.loading = false;
                state.ShopingCartItems.push(action.payload);
            })
            .addCase(AddShopingCartItemAC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DeleteShopingCartItemAC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteShopingCartItemAC.fulfilled, (state, action) => {
                state.loading = false;
                state.ShopingCartItems = state.ShopingCartItems?.filter((shopingCartItem) => shopingCartItem.ShopingCartItemId != action.payload.ShopingCartItemId);
            })
            .addCase(DeleteShopingCartItemAC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(IncreaseShopingCartItemAC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(IncreaseShopingCartItemAC.fulfilled, (state, action) => {
                state.loading = false;
                // state.ShopingCartItems =[...state.ShopingCartItems, action.payload];
                state.ShopingCartItems?.map((shopingCartItem) =>
                    shopingCartItem.ShopingCartItemId == action.payload.ShopingCartItemId ? { ...shopingCartItem, TotalPrice: (shopingCartItem.Quantity + 1) * shopingCartItem.Price, Quantity: shopingCartItem.Quantity++ } : shopingCartItem);
            })
            .addCase(IncreaseShopingCartItemAC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DecreaseShopingCartItemAC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DecreaseShopingCartItemAC.fulfilled, (state, action) => {
                state.loading = false;
                // state.ShopingCartItems = [...state.ShopingCartItems, action.payload];
                state.ShopingCartItems?.map((shopingCartItem) =>
                    shopingCartItem.ShopingCartItemId == action.payload.ShopingCartItemId && shopingCartItem.Quantity > 1 ? { ...shopingCartItem,  TotalPrice: (shopingCartItem.Quantity - 1) * shopingCartItem.Price, Quantity: shopingCartItem.Quantity-- } : shopingCartItem);
            })
            .addCase(DecreaseShopingCartItemAC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetAllShopingCartItemsAC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllShopingCartItemsAC.fulfilled, (state, action) => {
                state.loading = false;
                state.ShopingCartItems = action.payload; // 
            })
            .addCase(GetAllShopingCartItemsAC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.ShopingCartItems = [];
            });
    },
});

export default shopingCartSlice.reducer;
export const {ClearShopingCartItems} = shopingCartSlice.actions;
