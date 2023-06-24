import classes from './HighlightedPizza.module.css';

const HighlightedPizza= (props) => {
  const isVeg= props.isVeg === true ? 'Yes': 'No';
  return (
    <figure className={classes.pizza}>
      <p>{props.pizzaName}</p>
      <figcaption>Price: Rs.{props.price}</figcaption>
      <figcaption>Vegetarian: {isVeg}</figcaption>
    </figure>
  );
};

export default HighlightedPizza;
