import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItem, PizzaSliceState, Status } from './types';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
};

export type SearchPizzaParams = {
  mockURL: string;
  sortBy: string;
  category: string;
  order: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async params => {
    const { mockURL, sortBy, category, order, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `${mockURL}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );

    return data;
  }
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
