import React, {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import axios from 'axios'
import { Link } from "react-router-dom";
// import "./styles/App.css";


const Authorization = ()=> {

  const [user, setUser] = useState({ email: "", password: "" });
  const [serverResponse, setserverResponse] = useState('');
  function exit(e){
    try {
      e.preventDefault();
      axios.post('http://localhost:4000/auth', 
      user
     ).then((response)=>{
      if (response) {

      }

      //localStorage.setItem('Authorization', response.data.data);
      window.location.href = '/'
     }).catch((e)=>{
      if (e.response.status == 401) {
        
        return setserverResponse(`${e.response.data.success}`)
        
      }

   
     })
      
     
     
    } catch (error) {
      console.log(error);


    }

  
  }
  

  return (
    <div className="containerForm">
      <form>
        <label htmlFor="">Enter Email</label>

        {serverResponse?
          <p style={{color: 'red'}}>{serverResponse}</p>
          : ''
        }

        <MyInput 
          style={{marginTop: '10px', marginBottom: '20px' }}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="text"
          placeholder="hello@gmail.com"
          />
        
        <label htmlFor="">Enter Password</label>
        <MyInput 
          style={{marginTop: '10px', marginBottom: '20px' }}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="your password"
          />
        <MyButton onClick={exit} style={{width: '200px' }}>Log in</MyButton>
      </form>
      <p style={{fontSize: '18px', marginTop: '25px', marginBottom: '10px' }}>Don't have an account? <Link  to='/regist' style={{color:'blue'}}>Sign Up</Link></p>
    </div>
  )
}

export default Authorization;
