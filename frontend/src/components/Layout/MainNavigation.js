import { NavLink } from 'react-router-dom';
import {useContext} from 'react';

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authCtx=useContext(AuthContext);
  const isLoggedIn=authCtx.isLoggedIn;

  //const isAdmin=authCtx.isAdmin;
  const isAdmin=authCtx.Email === 'admin@example.com';
  // const logoutHandler=() => {
  //   authCtx.logout();
  //   };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Pizza Shop</div>
      <nav className={classes.nav}>
        <ul>
        {isLoggedIn &&  <li>
        <NavLink to='/home' activeClassName={classes.active}>
            Home
          </NavLink>
          </li>}
        {!isLoggedIn &&  <li>
          <NavLink to='/auth' activeClassName={classes.active}>
            Login
          </NavLink>
          </li> }
          {isLoggedIn &&  <li>
          <NavLink to='/profile' activeClassName={classes.active}>
            Profile
          </NavLink>
          </li> }
          {isLoggedIn && <li>
            <NavLink to='/Allpizzas' activeClassName={classes.active}>
              All Pizzas
            </NavLink>
          </li>}
          {isLoggedIn && isAdmin && <li>
            <NavLink to='/new-pizza' activeClassName={classes.active}>
              Add a Pizza
            </NavLink>
          </li> }
          {isLoggedIn && <li>
            <NavLink to='/viewCart' activeClassName={classes.active}>
              Cart
            </NavLink>
          </li> }
          {isLoggedIn &&  <li>
            <NavLink to='/logout' activeClassName={classes.active}>
              Logout
            </NavLink>
          </li> }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;


