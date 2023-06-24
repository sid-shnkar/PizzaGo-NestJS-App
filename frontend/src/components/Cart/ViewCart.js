import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import classes from './ViewCart.module.css';


const calculateCartTotal=(cartItems) =>{
let total=0;
cartItems.forEach(item => {
total+=item.pizzaPrice*item.quantity;    
});

return total;
};

const ViewCart = (props) => {
  //const history = useHistory();
  //const location = useLocation();

  const cartNetTotal=calculateCartTotal(props.cartItems);

  return (
    <Fragment>
      <ul className={classes.list}>
      <li className={classes.item}>
      <figure>
        <blockquote>
          <p>Net Cart Total: Rs. {cartNetTotal}</p>
        </blockquote>
      </figure>
      <Link className='btn' to={`/placeOrder`}>
        Place Order
      </Link>
    </li>
        {props.cartItems.map((item) => (
          <CartItem
            key={item._id}
            id={item._id}
            pizzaName={item.pizzaName}
            pizzaPrice={item.pizzaPrice}
            isVeg={item.isVeg}
            totalPrice={item.totalPrice}
            quantity={item.quantity}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default ViewCart;
