import { useContext } from 'react';
import { Modal } from './UI/Modal';
import CartContext from '../store/CartContext';
import { currenctFormatter } from '../util/format';
import ProgressContext from '../store/ProgressContext';
import CartItem from './CartItem';
import { Button } from './UI/Button';

type itemContext = {
  quantity: number;
  price: number;
  id: number;
  name: string;
};

type progressContext = {
  progress: string;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
};

export default function Cart() {
  const cartCtx = useContext(CartContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice: number, item: itemContext) =>
      totalPrice + item.quantity * item.price,
    0
  );

  const progressCtx = useContext<progressContext>(ProgressContext);

  function hideCartHandler() {
    progressCtx.hideCart();
  }

  function goToCheckoutHandler() {
    progressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={progressCtx.progress === 'cart'}
      onClose={
        progressCtx.progress === 'cart'
          ? hideCartHandler
          : () => {
              return;
            }
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item: itemContext) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currenctFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCartHandler}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={goToCheckoutHandler}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
