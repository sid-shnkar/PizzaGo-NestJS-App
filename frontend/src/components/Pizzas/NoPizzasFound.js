import { Link } from 'react-router-dom';

import classes from './NoPizzasFound.module.css';

const NoPizzasFound = () => {
  return (
    <div className={classes.nopizzas}>
      <p>No pizzas found!</p>
      <Link className='btn' to='/new-pizza'>
        Add new Pizza
      </Link>
    </div>
  );
};

export default NoPizzasFound;
