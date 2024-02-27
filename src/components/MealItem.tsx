import { useContext } from 'react';
import { currenctFormatter } from '../util/format.js';
import { Button } from './UI/Button';
import CartContext from '../store/CartContext';

type MealitemProps = {
  meal: {
    price: number;
    image: string;
    name: string;
    description: string;
    id: number;
  };
};

export default function MealItem({ meal }: MealitemProps) {
  const cartCtx: { addItem: ({}) => void } = useContext(CartContext);

  function addMealHandler() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currenctFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={addMealHandler}> Add to cart </Button>
        </p>
      </article>
    </li>
  );
}
