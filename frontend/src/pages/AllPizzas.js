import { useEffect } from 'react';

import PizzaList from '../components/Pizzas/PizzaList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoPizzasFound from '../components/Pizzas/NoPizzasFound';
import useHttp from '../hooks/use-http';
import { getAllPizzas } from '../lib/api';

const AllPizzas = () => {
  const { sendRequest, status, data: loadedPizzas, error } = useHttp(
    getAllPizzas,
    true
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === 'completed' && (!loadedPizzas || loadedPizzas.length === 0)) {
    return <NoPizzasFound />;
  }

  return <PizzaList pizzas={loadedPizzas} />;
};

export default AllPizzas;
