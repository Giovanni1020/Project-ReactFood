import { useContext } from 'react';
import { Modal } from './UI/Modal';
import CartContext from '../store/CartContext';
import { currenctFormatter } from '../util/format';
import Input from './UI/Input';
import { Button } from './UI/Button';
import ProgressContext from '../store/ProgressContext';

type itemContext = {
  quantity: number;
  price: number;
  id: number;
  name: string;
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(ProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice: number, item: itemContext) =>
      totalPrice + item.quantity * item.price,
    0
  );

  function closeHandler() {
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={closeHandler}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total Ammouht: {currenctFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-Mail Adress" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button typeProp="button" textOnly onClick={closeHandler}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
