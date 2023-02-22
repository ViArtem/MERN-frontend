import React, { useState } from "react";
import jwt from 'jwt-decode'
import axios from 'axios'
const NavBar = ({styleClass, history, historyList}) => {

  let className = 'navBar '
  let userRole
  let userName
  if (localStorage.getItem('Authorization')) {
  if (jwt(localStorage.getItem('Authorization'))) {
    userRole = jwt(localStorage.getItem('Authorization')).role
    userName = jwt(localStorage.getItem('Authorization')).username
  
  }
}
if (styleClass) {
   className += styleClass.styleClass;
}

//історія адміна

function getHistory(){

  if(jwt(localStorage.getItem('Authorization'))){
      if(jwt(localStorage.getItem('Authorization')).role == 'admin'){
      axios.post('http://localhost:4000/gethistory', {
        role: userRole
      })
      .then((allContact)=>{
        if (allContact) {
          historyList([...allContact.data])
          history(true)
        }
  
        
      })
      }
    }
  
}


function exit() {
  localStorage.clear()
  window.location.href = '/auth'
 // console.log('Hello');
}

  return (

  <div className={className}>
     <p style={{ fontSize: "18px" }}>Role: {userRole}</p>
     <p style={{ fontSize: "18px" }}>User name: {userName}</p>
     {
        jwt(localStorage.getItem('Authorization')).role == 'admin'?
        <p onClick={getHistory} style={{ fontSize: "18px" }}>View History</p>
        : ''
      }
     <p onClick={exit} style={{ fontSize: "18px" }}>Exit</p>

     
    </div>
  );
};

export default NavBar;