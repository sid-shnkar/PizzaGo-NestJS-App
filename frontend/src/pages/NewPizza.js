import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PizzaForm from '../components/Pizzas/PizzaForm';
import useHttp from '../hooks/use-http';
import { addPizza } from '../lib/api';

const NewPizza = () => {
  const { sendRequest, status } = useHttp(addPizza);
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
      history.push('/Allpizzas');
    }
  }, [status, history]);

  const addPizzaHandler = (pizzaData) => {
    sendRequest(pizzaData);
  };

  return <PizzaForm isLoading={status === 'pending'} onAddPizza={addPizzaHandler} />;
};

export default NewPizza;
