import { Fragment } from "react";
import classes from '../components/StartingPage/StartingPageContent.module.css';
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const LogoutPage = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Fragment>
      <section className={classes.starting}>
      <h1>Are you sure you want to logout ?</h1>
        <button onClick={logoutHandler} className="btn">Logout</button>
    </section>
    </Fragment>
  );
};

export default LogoutPage;
