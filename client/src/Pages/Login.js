import React, { useState } from "react";
import LoginForm from "../Components/LoginForm";
import SignUpForm from "../Components/SignUpForm";

function Login(){
 const [form, setForm] = useState(true)

 function changeForm(){
  setForm(!form)
 }

  return(
    <div>
      {form ? <LoginForm setForm={setForm}/> : <SignUpForm setForm={setForm}/>}
    </div>
  )
}

export default Login