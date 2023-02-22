import React, {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import axios from 'axios'
import { Link } from "react-router-dom";
import "../styles/App.css";


const Registration = ()=> {

    const [newUser, setNewUser] = useState({firstName: "", lastName: "", email: "", password: "" });
    const [errorValue, seterrorValue] = useState('');

    async function registrationUser(e){
      try {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/regist', 
        newUser
       )
        //localStorage.setItem('Authorization', response.data.token)
        window.location.href = '/'
      } catch (error) {
        console.log(error);
        if (error.request.status == 401 || 403 || 406) {
          return seterrorValue(error.response.data.success);
        }
        if (error.request.status == 501) {
          return console.log(error.response.data.message)
        }

        console.log(error);
      }
  
    
    }


    return (
        <div className="containerForm">
          <form>
            <label htmlFor="">Enter Email</label>
            {errorValue?
            <p style={{color: 'red' }}>{errorValue}</p>
               :''
            }
            <MyInput 
                style={{marginTop: '10px', marginBottom: '10px' }}
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                type="text"
                placeholder="hello@gmail.com"
                />
            <label htmlFor="">First Name</label>
            <MyInput 
                style={{marginTop: '10px', marginBottom: '10px' }}
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                type="text"
                placeholder="John"
                />
            <label htmlFor="">Last Name</label>
            <MyInput 
                style={{marginTop: '10px', marginBottom: '10px' }}
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                type="text"
                placeholder="Doe"
                />
            <label htmlFor="">Enter Password</label>
            <MyInput 
                style={{marginTop: '10px', marginBottom: '10px'}}
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                type="text"
                placeholder="password"
                />
            <MyButton 
                style={{width: '200px' }}
                onClick={registrationUser}
                >Login</MyButton>
          </form>
          <p style={{fontSize: '18px', marginTop: '25px', marginBottom: '10px' }}>Have an account? <Link  to='/auth' style={{color:'blue'}}>Log in now!</Link> </p>
        </div>
      )
}

export default Registration;