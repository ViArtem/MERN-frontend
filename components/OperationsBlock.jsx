import React, { useEffect, useState } from "react";
const OperationsBlock = ({styleClass, foundRequest, addRequest, deleteRequest, editRequest, socket,}) => {
  let className = 'otherBlock '
  const [action, setAction] = useState([]);

  
  if (styleClass) {
    className += styleClass;
  }
  
useEffect(()=>{
    if (foundRequest) {
    
      if (foundRequest.success == 'User no found') {
        return setAction([...action, 'No found enter correct name'] )
      }
    setAction([...action, `Found request ${JSON.stringify(
      foundRequest.data.name.firstName
    )} ${JSON.stringify(foundRequest.data.name.lastName)}`] )

  
}
},[foundRequest])

useEffect(()=>{
if (addRequest) {
 try {
  
  if (addRequest.success == 'The number or name is not valid') {
    return setAction([...action, `Validate Error`] )
  }
    setAction([...action, `Add request ${JSON.stringify(
      addRequest.data.name.firstName
    )} ${JSON.stringify(addRequest.data.name.lastName)}`] )
  
 } catch (error) {
  console.log(error);
 }
}
},[addRequest])

useEffect(()=>{
  if (deleteRequest) {
    setAction([...action, `Delete request`])
  }
},[deleteRequest])

useEffect(()=>{
  if (editRequest) {
    setAction([...action, `Edit request `])
    
  }
},[editRequest])


//socket
const [addRequestForHistory, setAddRequestForHistory] = useState([]);
const [socketAction, setSocketAction] = useState([]);
if (socket) {
  //відображення напису про доданого користувача у блоці з операціями

  socket.on("add user", (data)=>{
    if (data.userErrorName == "Validate Error") {
      return setAddRequestForHistory( [...addRequestForHistory, `Validation error`])
    }
    if (data.userErrorName == "Enter last name") {
      return setAddRequestForHistory( [...addRequestForHistory, `Enter last name`])
    }
    
    setAddRequestForHistory( [...addRequestForHistory, `Add request ${data.newUserData.name.firstName} ${data.newUserData.name.lastName}`])
  });

  //відображення напису про знайденого користувача у блоці з операціями
  socket.on("find user", (data)=>{

    if(data.userFirstName == 'User not found'){
      return setAddRequestForHistory( [...addRequestForHistory, `${data.userFirstName}`])
    }
    setAddRequestForHistory( [...addRequestForHistory, `Find request ${data.foundData.name.firstName} ${data.foundData.name.lastName}`])
  });

  //відображення напису про редагованого користувача у блоці з операціями
  socket.on("edit user", (data)=>{

    if(data.userFirstName == 'Incorrect data'){
      return setAddRequestForHistory( [...addRequestForHistory, `${data.userFirstName}`])
    }
    setAddRequestForHistory( [...addRequestForHistory, `Edit request ${data.userFirstName}`])
  });

   //відображення напису про видаленого користувача у блоці з операціями
   socket.on("delete user", (data)=>{
    console.log(data);
    if(data.userFirstName == 'Delete error'){
      return setAddRequestForHistory( [...addRequestForHistory, `${data.userFirstName}`])
    }
    setAddRequestForHistory( [...addRequestForHistory, `Delete request`])
  });

}

useEffect(()=>{
  if (socket) {
    setSocketAction([...addRequestForHistory] )

}
},[addRequestForHistory])


  return (
    <div className={className }>
     <h1 style={{ marginBottom:'20px',  display: 'inline-block', fontSize: "22px", width: "100%" }}>Operations</h1>
     <ul>

      {foundRequest || deleteRequest || addRequest || editRequest?
      action.map((act, )=>{
        return <p key={ Math.random()}>{act}</p>
        
      }): ''  
      }

    
      {socket?
      socketAction.map((act, index)=>{
        return <p key={Math.random()}>{act}</p>
        
      }): ''
    }
    </ul>
    </div>
  );
};

export default OperationsBlock ;