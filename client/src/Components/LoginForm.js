import React, { useState, useContext } from "react";
import { UserContext } from "../Context/user";

function LoginForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState("password")
  const {user, setUser} = useContext(UserContext)

  function showPass(){
    if(show === "password"){
      setShow("text")
    }else{
      setShow("password")
    }
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
      .then(data => setUser(data));
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
      <br/>
      <a className="red waves-effect waves-light btn-small" onClick={showPass}>Show Password</a>
      <br/>
      <br/>
      <a className="blue waves-effect waves-light btn-large" onClick={e => handleSubmit(e)}>Login</a>
      <br/>
      <br/>
      </form>
      </div>
    </div>
  )
}

export default LoginForm