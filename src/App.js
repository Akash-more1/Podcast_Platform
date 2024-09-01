
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUp';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './components/commonComponents/PrivateRoutes';
function App() {
     const dispatch = useDispatch();
  useEffect(()=>{
    const unSubscribeAuth = onAuthStateChanged(auth,(user) =>{
          if(user){
            const unsubscribeSnapshot = onSnapshot(
              doc(db,"user", user.uid),

              (userDoc) =>{
                if(userDoc.exists()){
                  const userData = userDoc.data();
                  dispatch(
                    setUser({
                      name: userData.name,
                      email: userData.email,
                      uid: user.uid,
                    })
                  );
                }
              },

              (error) =>{
                console.error("Error fetching user data:", error);
              }
            );

            return ()=>{
              unsubscribeSnapshot();
            };
          }
    });


       

       return ()=>{
          unSubscribeAuth();
       } 
  },[]);
  
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Routes>

          <Route path='/' element= { <SignUpPage/>} />

          <Route element={<PrivateRoutes/>}>
           <Route path='/profile' element= { <Profile/>} />
           </Route>
          

        </Routes>
      </Router>
    </div>
  );
}

export default App;
