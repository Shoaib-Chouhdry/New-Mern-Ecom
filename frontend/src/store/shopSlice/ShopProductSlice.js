import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    isLoading:false,
    productList :[],
    productDetails : null
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllFilteredProduct = createAsyncThunk(
    "/products/fetchAllFilteredProduct",
        async ({filterParams,sortParams})=>{

        const query = new URLSearchParams({
          ...filterParams,
          sortBy:sortParams
        }).toString();
        const result = await axios.get(`${API_BASE_URL}/api/shop/product/get?${query}`)
        
        return result?.data
    }
);

export const fetchProductDetail = createAsyncThunk(
  "/products/fetchProductDetail",
      async (id)=>{

      const result = await axios.get(`${API_BASE_URL}/api/shop/product/get/${id}`)
    
      return result?.data
  }
);


 const ShoppingProductsSlice= createSlice({
    name: 'shoppingProduct',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=> {
       builder.addCase( fetchAllFilteredProduct.pending,(state)=>{
                 state.isLoading=true
               }).addCase(fetchAllFilteredProduct.fulfilled,(state,action)=>{
                 state.isLoading= false;
                 state.productList = action.payload.data;
              
               }).addCase(fetchAllFilteredProduct.rejected,(state,action)=>{
                 state.isLoading= false;
                 state.productList = null;
              }).addCase(fetchProductDetail.pending,(state,action)=>{
                state.isLoading= true;
                state.productDetails = null;
              }).addCase(fetchProductDetail.fulfilled,(state,action)=>{
                state.isLoading= false;
                state.productDetails = action.payload.data;
              }).addCase(fetchProductDetail.rejected,(state,action)=>{
                state.isLoading= false;
                state.productDetails = null;
              })
    }
})
export default ShoppingProductsSlice.reducer;


