import { Fragment } from "react";
import classes from './PlaceOrder.module.css';
import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import {placeOrder} from '../../lib/api';
import LoadingSpinner from '..//../components/UI/LoadingSpinner';

const PlaceOrder = () => {
  const authCtx = useContext(AuthContext);

  const { sendRequest, status, error } = useHttp(placeOrder);

  useEffect(() => {
    sendRequest(authCtx.Email);
  }, [sendRequest, authCtx.Email]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }


  return (
    <Fragment>
      <section className={classes.order}>
      <h1>Thank You for placing your order!</h1>
      <h3>An email has been sent to you containing your order details.</h3>
    </section>
    </Fragment>
  );
};

export default PlaceOrder;
