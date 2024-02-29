import { ReactNode, createContext, useReducer } from 'react';

type ItemContext = {
  quantity?: number;
  price?: number;
  id?: number;
  name?: string;
};

type CartContextType = {
  items: ItemContext[];
  addItem: (item: ItemContext) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  items: [
    {
      quantity: 0,
      price: 0,
      id: 0,
      name: 'empty',
    },
  ],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

function cartReducer(
  state: CartContextType,
  action: { type: string; item: ItemContext }
) {
  if (action.type === 'add-item') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      if (state) {
        const newQuant = state.items[existingCartItemIndex]?.quantity;
        const updatedItem = {
          ...state.items[existingCartItemIndex],
          quantity: newQuant ? newQuant + 1 : 0,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'remove-item') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];
    if (existingCartItem) {
      if (existingCartItem.quantity === 1) {
        updatedItems.splice(existingCartItem.id ?? 0, 1);
      } else {
        if (existingCartItem.quantity) {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity - 1,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        }
      }
      return { ...state, items: updatedItems };
    }
  }

  if (action.type === 'clear-cart') {
    return { ...state, items: [] };
  }

  return state;
}

type InitialStateType = { type: string } & CartContextType;
const initialState: InitialStateType = {
  items: [],
  type: '',
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
};

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, initialState);

  function addItem(item: ItemContext) {
    dispatchCartAction({ type: 'add-item', item });
  }

  function removeItem(itemId: number) {
    dispatchCartAction({ type: 'remove-item', item: { id: itemId } });
  }

  function clearCart() {
    dispatchCartAction({ type: 'clear-cart', item: {} });
  }

  const CartCont = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={CartCont}>{children}</CartContext.Provider>
  );
}

export default CartContext;
