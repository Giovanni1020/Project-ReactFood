import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import { Button } from './UI/Button';
import CartContext from '../store/CartContext';
import ProgressContext from '../store/ProgressContext.jsx';

type ProgressContext = {
  progress: string;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
};

type itemContext = {
  quantity: number;
  price: number;
  id: number;
  name: string;
};

export default function Header() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext<ProgressContext>(ProgressContext);

  const totalCartItems = cartCtx.items.reduce(
    (totalNumberItems: number, item: itemContext) => {
      return totalNumberItems + item.quantity;
    },
    0
  );

  function showCartHandler() {
    progressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCartHandler}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
