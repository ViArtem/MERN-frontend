import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import axios from 'axios'
import jwt from 'jwt-decode'
const AddContactBlock = ({styleClass, add, socket, setupdatingList}) => {

  let className = 'otherBlock '
  
  
  if (styleClass) {
    className += styleClass;
  }
  const [contact, setContact] = useState({ fullName:"", number: "", owner: jwt(localStorage.getItem('Authorization')).id, action: "Add", });
  
  const addContact = (e) => {
    e.preventDefault();
if (socket) {
  socket.emit("send user value", {
    fullName: contact.fullName,
    number: contact.number,
    ownerId: contact.owner,
  });
  setupdatingList(Math.random())
  setContact({ ...contact, number: "",  fullName:""});

}else{
    axios.post('http://localhost:4000/add', 
     contact
    ).then((user) => {
      add(user)
      setupdatingList(Math.random())
      setContact({ ...contact, number: "",  fullName:""});
        
    }).catch((e)=>{
      if (e.response.status == 415) {
        return add({success: e.response.data.error})
      }
     
      console.log(e);
    })
  }
  };


return (
    // "addBlock otherBlock"
  <div className={className}>
     <h1 style={{ marginBottom:'20px',  display: 'inline-block', fontSize: "22px", width: "100%" }}>Add contact</h1>
      
      <form style={{ width: "100%" }}>
        <label for="">Enter full name</label>
        <MyInput
          style={{marginTop: '7px', marginBottom: '7px' }}
          value={contact.fullName}
          onChange={(e) => setContact({ ...contact, fullName:e.target.value })}
          type="text"
          minLength={1}
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

        <MyButton onClick={addContact}>Add</MyButton>
      </form>
    </div>
  );
};

export default AddContactBlock;