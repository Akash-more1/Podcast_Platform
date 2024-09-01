import React, { useState } from 'react'
import SignupForm from '../components/SignupComponents/SignupForm';
import LoginForm from '../components/SignupComponents/LoginForm';
import Header from '../components/commonComponents/Header';
function SignUpPage() {
  
  const [flag, setFlag] = useState(true);

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>

      {(flag)? <SignupForm/>:<LoginForm/>}

     {(flag)? <p style={{cursor:"pointer"}}  onClick={()=>(setFlag(false))}>Click here if you already have an Account. Login.</p> :<p style={{cursor:"pointer"}} onClick={()=>(setFlag(true))}>  dont have an Account Click here to Sign Up.</p>}
      </div>
     
    </div>
  )
}

export default SignUpPage
