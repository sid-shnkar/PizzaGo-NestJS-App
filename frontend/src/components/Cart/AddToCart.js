import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { useHistory } from "react-router-dom";
import { addToCart } from "../../lib/api";
import classes from "./AddToCart.module.css";

const AddToCart = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const { sendRequest, status, error } = useHttp(addToCart);

  useEffect(() => {
    if (status === "completed" && !error) {
      history.push('/viewCart');
    }
  }, [status, error, history]);


  const addToCartHandler=()=> {
    sendRequest({
      email: authCtx.Email,
      pizzaName: props.pizzaName,
      quantity: itemQuantity,
    });
  };


  const removeItemHandler=() =>{
   setItemQuantity((prevState) => prevState-1);
  };

  const addItemHandler=() => {
    setItemQuantity((prevState) => prevState+1);
  };


  return (
    <Fragment>
        <div className={classes.item}>
        <div className={classes.quantity}>
          x <span>{itemQuantity}</span>
        </div>
        <div className={classes.actions}>
        <button className={classes.actionbtn} onClick={addItemHandler}>+</button>
          <button className={classes.actionbtn} onClick={removeItemHandler}>-</button>
        </div>
        <button className="btn" onClick={addToCartHandler}>Add</button>
      </div>
    </Fragment>
  );
};

export default AddToCart;

