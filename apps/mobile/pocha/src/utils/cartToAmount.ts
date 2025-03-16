import {Cart} from '../types/pocha';

const cartToAmount = (cart: Cart) => {
  if (!cart) return 0;

  return Array.from(Object.values(cart))
    .reduce((total, item) => total + item.menu.price * item.quantity, 0)
    .toFixed(2);
};

export default cartToAmount;
