import React, { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import MyButton from "./UI/button/MyButton";
import axios from 'axios'
const FoundBlock = ({styleClass, foundContactHttp, editModal, editModalValue, deletes, socket, setupdatingList}) => {
  let className = 'otherBlock '
  const[userData, setUserData] = useState('')
  const[showButton, setShowButton] = useState(false)
  const[deleteUser, setDeleteUser] = useState('')
  if (styleClass) {
    className += styleClass;
  }

useEffect(()=>{
  if (foundContactHttp) {  
    //userData
    if (foundContactHttp.success == 'User no found') {
      setShowButton (false)
      return  setUserData('No found')
    }
    setUserData( foundContactHttp.data.name.firstName + ' ' + foundContactHttp.data.name.lastName + ' : ' + foundContactHttp.data.number)
   
    if (jwt(localStorage.getItem('Authorization')).id ==  foundContactHttp.data.owner || jwt(localStorage.getItem('Authorization')).role == 'admin') {
      setShowButton (true)
    }else setShowButton (false)

    setDeleteUser({
      fullName:foundContactHttp.data.name.firstName + " " + foundContactHttp.data.name.firstName, 
      action: "Delete",
      firstName: foundContactHttp.data.name.firstName, 
      lastName: foundContactHttp.data.name.lastName, 
      userId: jwt(localStorage.getItem('Authorization')).id, 
      userRole: jwt(localStorage.getItem('Authorization')).role 
    });
  }

},[foundContactHttp])


const[deleteUserDataSocket, setdeleteUserDataSocket] = useState('')
const[foundUserDataSocket, setfoundUserDataSocket] = useState('')
const[allUserSocketData,setAllUserSocketData] = useState('')
const[showSocketButton, setShowSocketButton] = useState(false)

async  function ButtonDelete(e){
  try {
    e.preventDefault();
    if (socket) {
      socket.emit("delete user value", {
        fullName: deleteUserDataSocket,
        ownerId: jwt(localStorage.getItem('Authorization')).id, 
        userRole: jwt(localStorage.getItem('Authorization')).role
      });
      setupdatingList(Math.random())
      setfoundUserDataSocket('')
      setShowSocketButton(false)
    }else{
      const response = await axios.post('http://localhost:4000/delete', 
      deleteUser
      )
      deletes(response)
      setShowButton (false)
      setUserData ('')
      setupdatingList(Math.random())
    } 
     
  } catch (error) {
   console.log(error);   
  }
    
}


  function ButtonEdit(){
    // socket edit modal
    if (socket && editModal) {
      editModal(true)
      setShowSocketButton(false)
      setfoundUserDataSocket('')
      return editModalValue({
        firstName: allUserSocketData.name.firstName,
        lastName: allUserSocketData.name.lastName,
        number: allUserSocketData.number,
        id: allUserSocketData._id,
        socket: true
      })
    }
    //http edit modal
    if (editModal && foundContactHttp || editModalValue) {
      editModal(true)
      setShowButton(false)
      setUserData ('')
      editModalValue({
        firstName: foundContactHttp.data.name.firstName,
        lastName: foundContactHttp.data.name.lastName,
        number: foundContactHttp.data.number,
        id: foundContactHttp.data._id,
      })
    }
    
  }

  //socket 

  if (socket) {
    socket.on("findOne user", (data)=>{

      if (data.userFirstName == 'User not found') {
        setfoundUserDataSocket('User not found')
        setShowSocketButton(false)
      }else{
      setfoundUserDataSocket(`${data.foundData.name.firstName} ${data.foundData.name.lastName} ${data.foundData.number}`)
      setdeleteUserDataSocket(`${data.foundData.name.firstName} ${data.foundData.name.lastName}`)
      setAllUserSocketData(data.foundData) 
      //
      if (jwt(localStorage.getItem('Authorization')).id ==  data.foundData.owner || jwt(localStorage.getItem('Authorization')).role == 'admin') {
        setShowSocketButton(true)
      }else setShowSocketButton(false)
      
      }
      
    });
  
  }

  
  return (
    <div className={className}>
        <h1 style={{ marginBottom:'20px',  display: 'inline-block', fontSize: "22px", width: "100%" }}>Fond contact</h1>
        
        {foundUserDataSocket ?
        
        <p>{foundUserDataSocket}</p>
         :""}

        {showSocketButton  ?

          <MyButton
            onClick={ButtonEdit}
            style={{marginTop:'10px',}}
          >Edit</MyButton>

        :""}

        {showSocketButton ?
          <MyButton
            onClick={ButtonDelete}
            style={{ marginTop:'10px',}}
          >Delete</MyButton>
        :""}



        {foundContactHttp ?
        
        <p>{userData}</p>
         :""}

        {showButton  ?

        <MyButton
          onClick={ButtonEdit}
          style={{marginTop:'10px',}}
        >Edit</MyButton>
      
        :""}
        {showButton ?
        <MyButton
          onClick={ButtonDelete}
          style={{ marginTop:'10px',}}
        >Delete</MyButton>
        :""}




    
 

    </div>
  );
};

export default FoundBlock;