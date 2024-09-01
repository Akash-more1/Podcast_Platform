import React from 'react'
import Header from '../components/commonComponents/Header'
import { useSelector } from 'react-redux'
import Button from '../components/commonComponents/Button';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log("My User", user);



  if(!user){
    return <p>Loading...</p>
  }

  const handleLogout =()=>{
    signOut(auth).then(()=>{
     
      toast.success("loug out successfully");

    }).catch((error)=>{
     toast.error(error.message);
    });
  };
  
    return (
      <div>
        <Header/>
        
        
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text={"Logout"} onClick={handleLogout}/>
      </div>
    );
  
 
}

export default Profile
