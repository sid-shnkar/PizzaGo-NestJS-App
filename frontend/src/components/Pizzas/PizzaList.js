import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PizzaItem from './PizzaItem';
import classes from './PizzaList.module.css';

const sortPizzas = (pizzas, ascending) => {
  return pizzas.sort((pizzaA, pizzaB) => {
    if (ascending) {
      return pizzaA.price > pizzaB.price ? 1 : -1;
    } else {
      return pizzaA.price < pizzaB.price ? 1 : -1;
    }
  });
};

const PizzaList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const sortedPizzas = sortPizzas(props.pizzas, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    });
  };

  //console.log(props.pizzas);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'} By Price
        </button>
      </div>
      <ul className={classes.list}>
        {sortedPizzas.map((pizza) => (
          <PizzaItem
            key={pizza._id}
            id={pizza._id}
            pizzaName={pizza.pizzaName}
            price={pizza.price}
            isVeg={pizza.isVeg}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default PizzaList;
