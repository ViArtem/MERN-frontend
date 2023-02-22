import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import jwt from 'jwt-decode'
import axios from 'axios'
const EditForm = ({userValue, edit, editModal, socket, setupdatingList}) => {

  const [contact, setContact] = useState({ 
      fullName:'', 
      number: '', 
      id: '',
      action: "Edit", 
      ownerId:jwt(localStorage.getItem('Authorization')).id, 
      userRole: jwt(localStorage.getItem('Authorization')).role
    });
  


  const editContact = (e) => {
    e.preventDefault();
    if (userValue.socket) {
     
      socket.emit("edit user value", {
        newFullName: contact.fullName ,
        newNumber: contact.number,
        idForUpdate: userValue.id,
        ownerId: contact.ownerId,
        userRole: contact.userRole,
      });
      editModal(false)
      setupdatingList(Math.random())
   
    }else{
    axios.post('http://localhost:4000/edit',  
     contact
    ).then((user) => {
      edit(user)
     
      editModal(false)
      setupdatingList(Math.random())
      setContact({ ...contact, number: "",  fullName:""});
     
        
    })
  }
  };

useEffect(()=>{
if (userValue) {
  setContact({...contact, number:userValue.number,  fullName: userValue.firstName + ' ' + userValue.lastName, id:userValue.id });
}
},[userValue])

  

  return (
    <div className="editBlock">
     <h1 style={{ marginBottom:'20px',  display: 'inline-block', fontSize: "22px", width: "100%" }}>Edit Contact</h1>
     <form style={{ width: "100%" }}>
        <label for="">Enter full name</label>
        <MyInput
          style={{marginTop: '7px', marginBottom: '7px' }}
          value={contact.fullName}
          onChange={(e) => setContact({ ...contact, fullName:e.target.value })}
          type="text"
          placeholder="Full name"
          
        />
        <label for="">Enter number</label>
        <MyInput
          style={{marginTop: '7px', marginBottom: '7px' }}
          value={contact.number}
          onChange={(e) => setContact({ ...contact, number: e.target.value })}
          type="text"
          maxLength={13}
          minLength={12}
          placeholder="+380685452894"
          
        />

        <MyButton onClick={editContact}>Update</MyButton>
      </form>

    </div>
  );
};

export default EditForm ;