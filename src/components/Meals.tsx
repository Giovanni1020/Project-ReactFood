import { useEffect } from 'react';
import { useState } from 'react';
import MealItem from './MealItem';

type MealitemProps = {
  price: number;
  image: string;
  name: string;
  description: string;
  id: number;
};

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');
      const mealsData = await response.json();
      setLoadedMeals(mealsData);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal: MealitemProps) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
