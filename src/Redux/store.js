import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customer/customerSlice';
import shopingCartReducer from './shopingCart/shopingCartSlice';

const store = configureStore({
    reducer: {
        customer: customerReducer,
        shopingCart:shopingCartReducer,
    }
});

export default store;
