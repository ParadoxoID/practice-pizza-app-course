import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async params => {
    const { mockURL, sortBy, category, order, search, currentPage } = params;
    const { data } = await axios.get(
      `${mockURL}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading' // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: state => {
      state.status = 'error';
      state.items = [];
    }
  }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
