import { CartItem } from '../redux/slices/cart/types';

export const calcTotalPrice = (items: CartItem[]) =>
  items.reduce((acc: number, i) => (acc += i.price * i.count), 0);
