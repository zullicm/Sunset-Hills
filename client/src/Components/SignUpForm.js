import React, { useState, useContext }from "react";
import { UserContext } from "../Context/user";

function SignUpForm(){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
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
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then(r => r.json())
      .then(data => setUser(data));
  }


  return(
    <div className="login-form">
      <div className="login">
      <h5>Sign Up</h5>
        <form>
      <input 
          id="name" 
          name="name" 
          placeholder="John Doe" 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}></input>
      <label className="left">Full Name</label>
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
      <input 
          name="password-confirmation" 
          placeholder="Confirm Password" 
          type={show}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
      <label className="left">Confirm Password</label>
      <br/>
      <br/>
      <br/>
      <a className="red waves-effect waves-light btn-small" onClick={showPass}>Show Password</a>
      <br/>
      <br/>
      <a className="blue waves-effect waves-light btn-large" onClick={e => handleSubmit(e)}>Create Account</a>
      <br/>
      <br/>
      </form>
      </div>
    </div>
  )
}

export default SignUpForm