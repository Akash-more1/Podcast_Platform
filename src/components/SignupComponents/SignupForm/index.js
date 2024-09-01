
import React, { useState } from 'react'
import Header from "../../commonComponents/Header";
import InputComponent from '../../commonComponents/Input';
import Button from '../../commonComponents/Button';

import{auth, db} from "../../../firebase";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function SignupForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch =useDispatch();
    const navigate = useNavigate();
    const handleSignUp = async ()=>{
        

        console.log("handling sign up");
        if(password == confirmPassword && password.length>=6 && fullName && email){
          try{
               setLoading(true);
            //creating  users account.
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

            const user = userCredential.user;
            console.log("user", user);
          
            //saving user in database
           await setDoc(doc(db, "users", user.uid),{
            name: fullName,
            email: user.email,
            uid: user.uid
            
           });

           //save data in the redux, call the redux action
            dispatch(
              setUser({
                name: fullName,
                email: user.email,
                uid: user.uid
              })
            );
            toast.success("Sign up successful !");
            setLoading(false);
            navigate("/profile");
          }
          catch(e){
              console.log("error", e);
              toast.error(e.message);
              setLoading(false);
          }
        }
        else{
          if(password!=confirmPassword){
            toast.error("passwords not matching");
          }
          else if(password.length<6){
            toast.error("password should have atleast six charactors");
          }
          setLoading(false);
        }
       

      }

  return (
    <div>
      <div className='input-wrapper'>
      <h1>Sign Up</h1>
        <InputComponent state={fullName} setState={setFullName} placeholder="fullName" type="text" required={true}/>

        <InputComponent state={email} setState={setEmail} placeholder="Email" type="text" required={true}/>

        <InputComponent state={password} setState={setPassword} placeholder="Password" type="password" required={true}/>

        <InputComponent state={confirmPassword} setState={setConfirmPassword} placeholder="Confirme Password" type="password" required={true}/>

       <Button text={loading? "loading..." : "sign up"} disabled={loading} onClick={handleSignUp}/>
      </div>
    </div>
  )
}

export default SignupForm;
