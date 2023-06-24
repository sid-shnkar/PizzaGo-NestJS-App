import { Link } from 'react-router-dom';

import classes from './PizzaItem.module.css';

const PizzaItem = (props) => {
  //console.log(props.id);
  const isVeg= props.isVeg === true ? 'Yes': 'No';
  
  return (
    <li className={classes.item} key={props.id}>
      <figure>
        <blockquote>
          <p>{props.pizzaName}</p>
        </blockquote>
        <figcaption>Vegetarian: {isVeg}</figcaption>
        <figcaption>Rs. {props.price}</figcaption>
      </figure>
      <Link className='btn' to={`/Allpizzas/${props.id}`}>
        Add to Cart
      </Link>
    </li>
  );
};

export default PizzaItem;
