// CustomerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { signupCustomer, loginCustomer,updateCustomer } from './customerActions';

const initialState = {
  Customer: null,
  loading: false,
  isLogin: false,
  isSignup: false,
  error: null,
};

const CustomerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    // Define any synchronous reducers if needed
    fetchCustomer(state, action){
      // try get customer and return true, false
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(signupCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignup = true; // from response
      })
      .addCase(signupCustomer.rejected, (state, action) => {
        state.loading = false;
        state.isSignup = false;
        state.error = action.payload; // from thunkAPI.rejectWithValue(error.response.data);
      })
      .addCase(loginCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.Customer = action.payload; // from response
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload; // from thunkAPI.rejectWithValue(error.response.data);
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.Customer = action.payload; // from response
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload; // from thunkAPI.rejectWithValue(error.response.data);
      })
  },
});

export default CustomerSlice.reducer;
 