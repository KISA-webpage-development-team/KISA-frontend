/*
 * useCart.ts
 * - fetch cart by user email and pochaID
 */
// useCart.tsx (responsible for managing cart data and state)
import {useState, useEffect, useCallback} from 'react';
import {getUserCart} from '../apis/queries';
import {changeItemInCart} from '../apis/mutations';
import {Cart} from '../types/pocha';
import {debounce} from 'lodash';
import {HookStatus} from './types';

const cartToTotalAmount = (cart: Cart) => {
  if (!cart) return 0;

  return Array.from(Object.values(cart))
    .reduce((total, item) => total + item.menu.price * item.quantity, 0)
    .toFixed(2);
};

const useCart = (email: string, pochaID: number) => {
  const [cart, setCart] = useState<Cart>();
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [status, setStatus] = useState<HookStatus>('loading');
  const [error, setError] = useState<string>();

  const fetchCart = useCallback(async () => {
    setStatus('loading');
    try {
      const fetchedCart = await getUserCart(email, pochaID);
      setCart(fetchedCart);
      setTotalAmount(cartToTotalAmount(fetchedCart));
      setStatus('success');
    } catch (err) {
      setError('Failed to load cart data');
      setStatus('error');
    }
  }, [email, pochaID]);

  // Automatically fetch cart data on mount inside the hook
  useEffect(() => {
    if (email && pochaID) {
      fetchCart();
    }
  }, [email, pochaID, fetchCart]);

  // update item's quantity in UI (optimistic UI)
  const updateQuantityUI = (menuid: number, newQuantity: number) => {
    setCart(prevCart => {
      const updatedCart = {
        ...prevCart,
        [menuid]: {
          ...prevCart[menuid],
          quantity: prevCart[menuid].quantity + newQuantity,
        },
      };
      // immediately update total amount

      setTotalAmount(cartToTotalAmount(updatedCart));
      return updatedCart;
    });
  };

  // Debounced API call for updating cart items
  const debouncedChangeItemInCart = debounce(
    async (menuid: number, newQuantity: number) => {
      try {
        await changeItemInCart(email, pochaID, {
          menuID: menuid,
          quantity: newQuantity,
        });
      } catch (error) {
        console.error('Error updating cart item', error);
        setError('Failed to update cart');
        fetchCart(); // Revert the cart state on failure
      }
    },
    1000,
  );

  // Optimistic UI Update + Total 즉시 업데이트
  const handleQuantityChange = (menuid: number, newQuantity: number) => {
    // [NOTE] UI is updated here first
    // API call is made in the debouncedChangeItemInCart function,
    // so most of the time, UI and database will be synced
    updateQuantityUI(menuid, newQuantity);

    debouncedChangeItemInCart(menuid, newQuantity);
  };

  return {
    cart,
    status,
    error,
    totalAmount,
    handleQuantityChange,
    fetchCart,
  };
};

export default useCart;
