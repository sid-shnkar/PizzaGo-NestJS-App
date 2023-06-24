import { Fragment, useEffect} from 'react';
import { useParams,  useHistory } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import {updateItemCart} from '../../lib/api';


import LoadingSpinner from '../UI/LoadingSpinner';


const UpdateItemCart = () => {

    const params = useParams();
    const history = useHistory();
  
    const { cartId, updatedQuantity } = params;
  
    //console.log("Updated Qunaitut in COMPONENT: ",updatedQuantity);

    const { sendRequest, status, error } = useHttp(
      updateItemCart,
      true
    );
  
    useEffect(() => {
        //console.log("Updated quantity inside USEFFECT: ", updatedQuantity);
      sendRequest({id: cartId, quantity: +updatedQuantity});
    }, [sendRequest, cartId, updatedQuantity]);

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
  
  export default UpdateItemCart;
