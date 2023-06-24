import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext=React.createContext({
  token: '',
  UserId: '',
  Email: '',
  isAdmin: false,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

const calculateRemainingTime=(expirationTime) => {
const currentTime=new Date().getTime();
const adjExpirationTime=new Date(expirationTime).getTime();

const remainingTime=adjExpirationTime-currentTime;

return remainingTime;


};

const retrieveStoredToken=() =>{
  const storedToken=localStorage.getItem('token');
  const storedUserId=localStorage.getItem('UserId');
  const storedEmail=localStorage.getItem('Email');
  const storedisAdmin=localStorage.getItem('isAdmin');
  const storedExpirationDate=localStorage.getItem('expirationTime');

  const remainingTime=calculateRemainingTime(storedExpirationDate);

  if(remainingTime <= 60000){
    localStorage.removeItem('token');
    localStorage.removeItem('UserId');
    localStorage.removeItem('Email');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    UserId: storedUserId,
    Email: storedEmail,
    isAdmin: storedisAdmin,
    duration: remainingTime
  }
};

export const AuthContextProvider=(props) => {

    const tokenData=retrieveStoredToken();

    let initialToken;
    let initialUserId;
    let initalEmail;
    let initialisAdmin;

    if(tokenData){
        initialToken=tokenData.token;
        initialUserId=tokenData.UserId;
        initalEmail=tokenData.Email;
        initialisAdmin=tokenData.isAdmin;
    }

    const [token, setToken]=useState(initialToken);
    const [UserId, setUserId]=useState(initialUserId);
    const [Email, setEmail]=useState(initalEmail);
    const [isAdmin, setisAdmin]=useState(initialisAdmin);

    const userIsLoggedIn=!!token;

    const logoutHandler=useCallback(() => {
        setToken(null);
        setUserId('');
        setEmail('');
        setisAdmin(false);
        localStorage.removeItem('token');
        localStorage.removeItem('UserId');
        localStorage.removeItem('Email');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('expirationTime');

        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
       },[]);
    
    const loginHandler=(token, expirationTime, UserId, Email, isAdmin) => {

      setToken(token);
      setUserId(UserId);
      setEmail(Email);
      setisAdmin(isAdmin);

      localStorage.setItem('token',token);
      localStorage.setItem('UserId', UserId);
      localStorage.setItem('Email', Email);
      localStorage.setItem('isAdmin', isAdmin);
      localStorage.setItem('expirationTime',expirationTime);

      const remainingTime=calculateRemainingTime(expirationTime);

       logoutTimer=setTimeout(logoutHandler, remainingTime);

    };

    
   useEffect(() => {
   if(tokenData){
    console.log(tokenData.duration);
    console.log(tokenData.UserId);
    console.log(tokenData.Email);
    console.log(tokenData.isAdmin);
     logoutTimer=setTimeout(logoutHandler, tokenData.duration);
   }
   }, [tokenData, logoutHandler]);

    const contextValue={
        token: token,
        UserId: UserId,
        Email: Email,
        isAdmin: isAdmin,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };


    return (
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    );    
};

export default AuthContext;



