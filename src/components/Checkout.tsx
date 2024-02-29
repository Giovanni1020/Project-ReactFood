import { FormEvent, useContext } from 'react';
import { Modal } from './UI/Modal';
import CartContext from '../store/CartContext';
import { currenctFormatter } from '../util/format';
import Input from './UI/Input';
import { Button } from './UI/Button';
import ProgressContext from '../store/ProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

type itemContext = {
  quantity: number;
  price: number;
  id: number;
  name: string;
};

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(ProgressContext);

  const { data, loading, error, sendRequest, clearData } = useHttp(
    'http://localhost:3000/orders',
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice: number, item: itemContext) =>
      totalPrice + item.quantity * item.price,
    0
  );

  function closeHandler() {
    userProgressCtx.hideCheckout();
  }

  function finishHandler() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    const fd = new FormData(event.target as any);
    const fullFormData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: fullFormData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button typeProp="button" textOnly onClick={closeHandler}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (loading) {
    actions = <span>Placing order....</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={finishHandler}
      >
        <h2>Sucess!</h2>
        <p>Your order has been placed</p>
        <p className="modal-actions">
          <Button onClick={finishHandler}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={closeHandler}
    >
      <form onSubmit={submitHandler}>
        <h2>Checkout</h2>
        <p>Total Ammouht: {currenctFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Adress" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to order" msg={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
