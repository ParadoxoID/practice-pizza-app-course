import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { getCartFromLocalStorage } from '../../../utils/getCartFromLocalStorage';
import { CartItem, CartSliceState } from './types';

const { items, totalPrice } = getCartFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice,
  items
};

export const cartSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(itm => itm.id === action.payload.id);
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find(itm => itm.id === action.payload);
      if (findItem) {
        findItem.count -= 1;
        state.totalPrice = calcTotalPrice(state.items);
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
