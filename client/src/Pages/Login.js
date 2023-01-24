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
      <button onClick={changeForm}>change form</button>
      {form ? <LoginForm /> : <SignUpForm />}
    </div>
  )
}

export default Login