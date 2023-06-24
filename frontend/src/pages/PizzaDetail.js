import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HighlightedPizza from '../components/Pizzas/HighlightedPizza';
import useHttp from '../hooks/use-http';
import {getPizzaById} from '../lib/api';


import LoadingSpinner from '../components/UI/LoadingSpinner';
import AddToCart from '../components/Cart/AddToCart';


const PizzaDetail = () => {

    const params = useParams();
  
    const { pizzaId } = params;
  
    const { sendRequest, status, data: loadedPizza, error } = useHttp(
      getPizzaById,
      true
    );
  
    useEffect(() => {
      sendRequest(pizzaId);
    }, [sendRequest, pizzaId]);
  
    if (status === 'pending') {
      return (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      );
    }
  
    if (error) {
      return <p className='centered'>{error}</p>;
    }
  
    if (!loadedPizza) {
      return <p>Could not fecth pizza</p>;
    }
  

    return (
      <Fragment>
        <HighlightedPizza pizzaName={loadedPizza.pizzaName} isVeg={loadedPizza.isVeg} price={loadedPizza.price} />
        <AddToCart pizzaName={loadedPizza.pizzaName}></AddToCart>
      </Fragment>
    );
  };
  
  export default PizzaDetail;


