import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './store/CartContext';
import { ProgressContextProvider } from './store/ProgressContext';

function App() {
  return (
    <ProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </ProgressContextProvider>
  );
}

export default App;
