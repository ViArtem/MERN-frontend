import React, { useEffect, useState } from "react";
import axios from 'axios'
const UserList = ({updatingList}) => {
const[contacts, setContact] = useState([])


useEffect(()=>{
axios.get('http://localhost:4000/allUser')
.then((allContact)=>{
  if (allContact === undefined) {
    console.log("Запит повернув пусту відповідь.");
  } else {
    setContact([...allContact.data])
 
  }
}).catch((e)=>{
console.log(e);
})
}, [updatingList])

  return (
    <div className="userList">
     <h1 style={{ marginBottom:'20px',  display: 'inline-block', fontSize: "22px", width: "100%" }}>All contact</h1>
      
{contacts? (
<ul>
  {contacts.map((contact)=>{
    return <li key={Math.random()} className="contactLi">{contact.name.firstName} {contact.name.lastName}</li>
  })}
  
</ul>
) : '' }
    </div>
  );
};

export default UserList;