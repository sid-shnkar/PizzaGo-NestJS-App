import { Route, Switch, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import AllPizzas from './pages/AllPizzas';
import NewPizza from './pages/NewPizza';
import Layout from './components/Layout/Layout';
import AuthContext from './store/auth-context';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import LogoutPage from './pages/LogoutPage';
import UserProfilePage from './pages/UserProfilePage';
import PizzaDetail from './pages/PizzaDetail';
import ViewCartPage from './pages/ViewCartPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import RemoveItemCartPage from './pages/RemoveItemCartPage';
import UpdateItemCartPage from './pages/UpdateItemCartPage';


function App() {
  const authCtx=useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {authCtx.isLoggedIn && (<Route path='/home' exact>
          <HomePage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/Allpizzas' exact>
          <AllPizzas />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/profile' exact>
          <UserProfilePage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/viewCart' exact>
          <ViewCartPage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/placeOrder' exact>
          <PlaceOrderPage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/Allpizzas/:pizzaId' exact>
          <PizzaDetail />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/removeItemCart/:cartId' exact>
          <RemoveItemCartPage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/updateItemCart/:cartId/:updatedQuantity' exact>
          <UpdateItemCartPage />
        </Route>)}
        {!authCtx.isLoggedIn && ( <Route path='/auth'>
          <AuthPage />
        </Route> )}
        {/* <Route path='/Allpizzas/:pizzaId'>
          <PizzaDetail />
        </Route> */}
        {authCtx.isLoggedIn && authCtx.isAdmin && (<Route path='/new-pizza'>
          <NewPizza />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/logout'>
          <LogoutPage />
        </Route>)}
        <Route path='*'>
        <Redirect to='/'></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
