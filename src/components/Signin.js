import React from 'react';
import {signInWithPopup} from "firebase/auth"
import { Button } from '@mui/material';
import {auth, googleAuth} from '../firebase/setup';
import { navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {

  const navigate = useNavigate()

  const googleSignin = async () =>{
    try {
        await signInWithPopup(auth,googleAuth);
        setTimeout(() =>{
          auth.currentUser?.emailVerified && navigate('/')
        },2000)
        toast.success("SignedIn Successfully")
        
    } catch (err) {
        console.error(err)
    }
    
  }

  return (
    <div style={{backgroundColor:"grey",height:"100vh",padding:"20px"}}>
      <ToastContainer autoClose={2000}/>
       <div style={{
           fontSize:100,
           textAlign:"center",
           fontWeight: 700,
           color: "rgb(238, 32, 0)",
           textShadow: "3px 5px 5px rgb(90, 78, 78)",
           webkitTextStroke: "1px rgb(0, 0, 0)",
        }}>MOVIE APP</div>
      <div style={{position:"fixed",left:"45%",top:"35%"}}>
       <br />
      <Button onClick={googleSignin} color='error' variant='contained'>Signin with Google</Button>
      <br />
      <h2 style={{color:"white"}}>Let's start <br /> to explore movies <br /> from here.</h2>
      </div>
    </div>
  )
}

export default Signin
