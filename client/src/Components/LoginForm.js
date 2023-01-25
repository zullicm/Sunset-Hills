import React, { useState, useContext } from "react";
import { UserContext } from "../Context/user";
import { useNavigate } from "react-router-dom";

function LoginForm({setForm}){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState("password")
  const {user, setUser} = useContext(UserContext)
  const history = useNavigate()

  function showPass(){
    if(show === "password"){
      setShow("text")
    }else{
      setShow("password")
    }
  }

  function setCurrentUser(data){
    setUser(data)
    history('/userpage')
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
      .then(r => r.json())
      .then(data => setCurrentUser(data));
  }

  return(
    <div className="login-form">
      <h5>Login</h5>
      <div className="login">
        <form>
        <input 
          id="email" 
          name="email" 
          placeholder="JohnDoe@email.com" 
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}></input>
      <label className="left">Email</label>
        <input 
          name="password" 
          placeholder="Password" 
          type={show}
          value={password}
          onChange={(e) => setPassword(e.target.value)}></input>
      <label className="left">Password</label>
      <br/>
      <br/>
      <button className="show-pass z-depth-3" onClick={showPass}>SHOW PASSWORD?</button>
      <br/>
      <button className="login-signup z-depth-3" onClick={e => handleSubmit(e)}>LOGIN</button>
      </form>
      </div>
      <p><b><u>Need to make an account?</u></b></p>
      <button onClick={()=> setForm(false)} className="switch-form">SIGN UP</button>
    </div>
  )
}

export default LoginForm