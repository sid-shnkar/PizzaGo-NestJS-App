import { Link } from 'react-router-dom';
import { useState } from 'react';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  //console.log(props.id);
  const [itemQuantity, setItemQuantity] = useState(props.quantity);

  const isVeg= props.isVeg === true ? 'Yes': 'No';

  const removeItemHandler=() =>{
    setItemQuantity((prevState) => prevState-1);
   };
 
   const addItemHandler=() => {
     setItemQuantity((prevState) => prevState+1);
   };
  
  return (
    <li className={classes.item} key={props.id}>
      <figure>
        <blockquote>
          <p>{props.pizzaName}</p>
        </blockquote>
        <figcaption>Vegetarian: {isVeg}</figcaption>
        <figcaption>Base price: Rs. {props.pizzaPrice}</figcaption>
        <figcaption>Quantity: {itemQuantity}</figcaption>
        <div className={classes.itemUpdate}>
        <div className={classes.quantity}>
          x <span>{itemQuantity}</span>
        </div>
        <div className={classes.actions}>
        <button className={classes.actionbtn} onClick={addItemHandler}>+</button>
          <button className={classes.actionbtn} onClick={removeItemHandler} >-</button>
        </div>
        </div>
        <Link className={classes.actionbtn} to={`/updateItemCart/${props.id}/${itemQuantity}`}>
        Update
      </Link>
        <Link className={classes.actionbtn} to={`/removeItemCart/${props.id}`}>
        Remove
      </Link>
        {/* <figcaption>Total Price: Rs. {props.totalPrice}</figcaption> */}
      </figure>
    </li>
  );
};

export default CartItem;
