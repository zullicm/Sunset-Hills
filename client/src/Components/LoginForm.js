import React, { useState, useContext } from "react";
import { UserContext } from "../Context/user";
import { useNavigate } from "react-router-dom";

function LoginForm({setForm}){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState("password")
  const {user, setUser} = useContext(UserContext)
  const [error, setError] = useState(null)
  const history = useNavigate()

  function showPass(e){
    e.preventDefault();

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

  function handleError(e){
    setError(e)
    setEmail("")
    setPassword("")
    setShow("password")
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
    .then(r => {
      if(r.ok){
        r.json().then(data => setCurrentUser(data))
      }else{
        r.json().then(e => handleError(e))
      }
    })
  }

  return(
    <div className="login-form">
      <h5>Login</h5>
      {error ? <p className="login-error"><b><i><u>{error.error}</u></i></b></p>: null}
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
      <button className="show-pass z-depth-3" onClick={e => showPass(e)}>SHOW PASSWORD?</button>
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