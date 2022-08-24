import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: []
};

const calcTotalPrice = items =>
  items.reduce((acc, i) => (acc += i.price * i.count), 0);

export const cartSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(itm => itm.id === action.payload.id);
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      // state.totalPrice += action.payload.price;
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action) {
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
