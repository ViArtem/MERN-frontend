import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import axios from 'axios'
import jwt from 'jwt-decode'
const FindBlock = ({styleClass, find, socket}) => {
  let className = 'otherBlock '

  if (styleClass) {
    className += styleClass;
  }
  

const [contact, setContact] = useState({ fullName: "", action: "Find", });
const findContact = (e) => {
  e.preventDefault();

  if (socket) {
    socket.emit("find user value", {
      fullName: contact.fullName,
    }, jwt(localStorage.getItem('Authorization')).id);

    setContact({ ...contact, fullName: ""});

  }else{
    axios.post('http://localhost:4000/find', 
    contact
    ).then((user) => {

      // if (user.find) {
      //   return console.log(user.find);
      // }

      if (find) {
        find(user)
      }

      setContact({ ...contact, fullName: ""});
        
    }).catch((e)=>{
     
      if (e.response.data.found) {
      
        return find({success: e.response.data.found})
      }
      console.log('Error ' + e );
    })

    setContact({ ...contact, fullName: "" });
  }
};



  return (
     
    <div className={className }>
     <h1 style={{ marginBottom:'20px',  display: 'inline-block', fontSize: "22px", width: "100%" }}>Find number</h1>
      
      <form style={{ width: "100%" }}>
        <label for="">Enter full name</label>

        <MyInput
          style={{marginTop: '10px', marginBottom: '10px' }}
          value={contact.fullName}
          onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
          type="text"
          minLength={1}
          placeholder="Contact name"
          required
        />

        <MyButton onClick={findContact}>Find</MyButton>
      </form>
    </div>
  );
};

export default FindBlock;
