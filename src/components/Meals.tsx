import useHttp from '../hooks/useHttp';
import MealItem from './MealItem';
import Error from './Error';

type MealitemProps = {
  price: number;
  image: string;
  name: string;
  description: string;
  id: number;
};

const requestConfig = { method: 'GET' };

export default function Meals() {
  const url = 'http://localhost:3000/meals';

  const { data: loadedMeals, loading, error } = useHttp(url, requestConfig, []);

  if (loading) {
    return <p className="center">Loading....</p>;
  }

  if (error) {
    return <Error msg={error} title="Failed to fetch meals, please reload" />;
  }

  return (
    <ul id="meals">
      {loadedMeals ? (
        loadedMeals.map((meal: MealitemProps) => (
          <MealItem key={meal.id} meal={meal} />
        ))
      ) : (
        <p>A error has occured</p>
      )}
    </ul>
  );
}
