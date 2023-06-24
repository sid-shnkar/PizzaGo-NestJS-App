import classes from './UserProfile.module.css';
import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import useHttp from '../../hooks/use-http';
import { getUserProfile } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const UserProfile = () => {

    const authCtx = useContext(AuthContext);

    const isAdmin=authCtx.isAdmin;
     
    const { sendRequest, status, data: userDetails, error } = useHttp(getUserProfile, true);

    useEffect(() => {
        sendRequest(authCtx.UserId);
      }, [sendRequest, authCtx.UserId]);

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

      if (!userDetails) {
        return <p>No user details found!</p>;
      }

//console.log("Outside we have : ",UserEmail);

  return (
    <section className={classes.profile}>
      <h1>Hi {isAdmin === true? 'Admin': 'User'}!</h1>
      <h3>Your Email Id: {userDetails.email}</h3>
    </section>
  );
};

export default UserProfile;