import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Button } from '@mui/material';
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer';



function Navbar() {

  const logout = async () =>{
    try {
      await signOut(auth);
      toast.success("Logout Successfully",{
        theme:"dark"
      })
    } catch (err) {
      console.error(err);
      
    }
    
  }

  const navigate = useNavigate()

  const [movies,setMovies] = useState([])

  const getMovie = () =>{
   try {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`)
    .then(res=> res.json())
    .then(json=> setMovies(json.results))
   } catch (err) {
    console.error(err);
   }
  }
  
  const signinClick = () =>{
   navigate("/signin")
  }
  useEffect(() => {
    getMovie()
  },[])

  return (
    <div style={{
      backgroundImage:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${movies[8]?.poster_path})`,
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      height:"500px",
      width:"100%"
      }}>
        <ToastContainer autoClose={2000}/>
        <div style={{display:"flex",justifyContent:"space-between",padding:"20px"}}>

      <span className='logo'>MOVIE APP</span>

      <div>
      {auth.currentUser?.emailVerified?
      <Button onClick={logout} variant='contained' color='error' sx={{height:"40px", marginLeft:"10px"}}>Logout</Button>
       : <Button onClick={signinClick}color='error' variant='contained' sx={{height:"40px"}}>Signin</Button> }
      
      </div>
     
      </div>
      <div style={{padding:"20px"}}>
        <h1 style={{color:"white",fontSize:"70px",fontFamily:"initial"}}>{movies[8]?.original_title}</h1>
        
      </div>
      
    </div>
  )
}

export default Navbar
