import { useEffect, useContext } from 'react';

import ViewCart from '../components/Cart/ViewCart';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoCartItemsFound from '../components/Cart/NoCartItemsFound';
import AuthContext from "../store/auth-context";
import useHttp from '../hooks/use-http';
import { getCartItems } from '../lib/api';

const ViewCartPage = () => {
    const authCtx = useContext(AuthContext);

  const { sendRequest, status, data: loadedCartItems, error } = useHttp(
    getCartItems,
    true
  );

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

  if (status === 'completed' && (!loadedCartItems || loadedCartItems.length === 0)) {
    return <NoCartItemsFound />;
  }

  return <ViewCart cartItems={loadedCartItems} />;
};

export default ViewCartPage;
