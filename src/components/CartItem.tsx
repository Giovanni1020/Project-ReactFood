import { currenctFormatter } from '../util/format.js';

type cartItemProps = {
  name: string;
  quantity: number;
  price: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}: cartItemProps) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} X {currenctFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
