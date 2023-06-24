import { Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import {removeItemCart} from '../../lib/api';


import LoadingSpinner from '../UI/LoadingSpinner';


const RemoveItemCart = () => {

    const params = useParams();
    const history = useHistory();
  
    const { cartId } = params;
  
    const { sendRequest, status, error } = useHttp(
      removeItemCart,
      true
    );
  
    useEffect(() => {
      sendRequest(cartId);
    }, [sendRequest, cartId]);

    useEffect(() => {
        if (status === "completed" && !error) {
          history.push('/viewCart');
        }
      }, [status, error, history]);
  
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
  
    

    return (
      <Fragment>
      </Fragment>
    );
  };
  
  export default RemoveItemCart;
