import React, { useState, useContext }from "react";
import { UserContext } from "../Context/user";
import { useNavigate } from "react-router-dom";


function SignUpForm({setForm}){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [show, setShow] = useState("password")
  const {user, setUser} = useContext(UserContext)
  const [error, setError] = useState(null)
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

  function handleError(e){
    setError(e)
    setName("")
    setEmail("")
    setPassword("")
    setPasswordConfirmation("")
    setShow("password")
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
    .then(r => {
      if(r.ok){
        r.json().then(data => setCurrentUser(data))
      }else{
        r.json().then(e => handleError(e))
      }
    })
  }


  return(
    <div className="signup-form">
      <h5>Sign Up</h5>
      {error ? <p className="login-error"><b><i><u>{error.errors.map(error => <>{error}<br/></>)}</u></i></b></p>: null}
      <div className="signup">
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
      <button className="show-pass z-depth-3" onClick={showPass}>SHOW PASSWORD?</button>
      <br/>
      <button className="login-signup z-depth-3" onClick={e => handleSubmit(e)}>SIGN UP</button>
      </form>
      </div>
      <p><b><u>Already have an account?</u></b></p>
      <button onClick={()=> setForm(true)} className="switch-form">LOGIN</button>
    </div>
  )
}

export default SignUpForm