import React, { useState } from "react";

function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState("password")

  function showPass(){
    if(show === "password"){
      setShow("text")
    }else{
      setShow("password")
    }
  }

  return(
    <div className="login-form">
      <div className="login">
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
      </div>
    </div>
  )
}

export default Login