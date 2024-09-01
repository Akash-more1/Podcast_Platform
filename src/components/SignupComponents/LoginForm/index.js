import React, { useState } from 'react'
import InputComponent from '../../commonComponents/Input';
import Button from '../../commonComponents/Button';
import{auth, db, storage} from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async()=>{
      console.log("handling logIn");
        setLoading(true);
      if(email && password){
        try{
          const userCredential = await signInWithEmailAndPassword(
           auth,
           email,
           password
          );
  
          const user = userCredential.user;
  
          console.log("user", user);
  
          const userDoc = await getDoc(doc(db, "users",user.uid));
          const userData = userDoc.data();
          
          dispatch(
             setUser({
              name: userData.name,
              email: user.email,
              uid: user.uid,
  
             })
          );
          setLoading(false);
          toast.success("Log In Successfull !")
          navigate("/profile");
        }
        catch(error){
          console.error("error signing in:", error);
          toast.error(error.message);
          setLoading(false);
        }
      }
      else{
        toast.error("Fill Email and Password");
        setLoading(false);
      }
      
      }
  return (
    <div>
      <div className='input-wrapper'>
      <h1>Log In</h1>

        <InputComponent state={email} setState={setEmail} placeholder="Email" type="text" required={true}/>

        <InputComponent state={password} setState={setPassword} placeholder="Password" type="password" required={true}/>


       <Button text={loading? "loading..." : "Log In"} disabled={loading} onClick={handleLogin}/>
      </div>
    </div>
  )
}

export default LoginForm;

