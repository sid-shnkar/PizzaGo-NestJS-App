import { Link } from 'react-router-dom';

import classes from './NoCartItemsFound.module.css';

const NoCartItemsFound = () => {
  return (
    <div className={classes.noitems}>
      <p>No items in your Cart! Keep on Ordering!</p>
      <Link className='btn' to='/Allpizzas'>
        Order Now
      </Link>
    </div>
  );
};

export default NoCartItemsFound;