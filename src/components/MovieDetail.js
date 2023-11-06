import { Button, Grid, TextField, dialogClasses } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { auth, database } from '../firebase/setup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer';
import { MovieSharp } from '@mui/icons-material';

function MovieDetail() {

    const [review,setReview] = useState("");
    const [reviewData,setReviewData] = useState([])


    const location = useLocation();

    const  movieRef = doc(database,"Movies",`${location.state.movie.id}`);

    const reviewRef = collection(movieRef,"Reviews")

    const addReview =  async() =>{
        try {
           auth.currentUser && await  addDoc(reviewRef,{
            movieReview: review,
            email:auth.currentUser?.email,
            username:auth.currentUser?.displayName,
            profile_image: auth.currentUser?.photoURL
          })
          auth.currentUser ?  toast.success("Review added successfully",{
            theme:"dark"
          })
          : toast.warning("Please login")
        } catch (err) {
            console.error(err);
        }
      
    }

    const showReview = async() => {
        try {
          const data = await getDocs(reviewRef)
          const filteredData = data.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id
          }))
          setReviewData(filteredData);
        } catch (err) {
            console.error(err)
        }
        
    }

    useEffect(() =>{
        showReview()
    },[])


    return (

        <div style={{backgroundColor:"black",height:"100%"}}> 

        <Grid container>

            <Grid item xs={8}>
                <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${location.state.movie?.poster_path})`, height: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                    <ToastContainer autoClose={2000}/>
                    <div style={{ paddingTop: "200px", paddingLeft: "30px", paddingRight: "10px" }}>
                      
                            <h1 style={{ color: "white" }}>{location.state.movie?.original_title}</h1>
                    

                        <div style={{display:"flex"}}>
                            <h4 style={{ color: "white" }}>Language : {location.state.movie?.original_language}</h4>
                            <h4 style={{ color: "white" }}>-  Release Date : {location.state.movie?.release_date}</h4>
                        </div>


                       
                            <h3 style={{ color: "white" }}>{location.state.movie?.overview}</h3>
                            
                            <Trailer location={location}/>
                       
                    </div>


                </div>
            </Grid>
            <Grid item xs={4}>
                <div style={{backgroundColor:"black", padding:"20px"}}>

                    <Grid container>
                    <div>
                        <h5 style={{color:"#147ADF"}}> Add review</h5>
                        <TextField onChange={(e) => setReview(e.target.value)} label="Review" variant='outlined' size='small' style={{backgroundColor:"white", borderRadius:"5px"}}/>

                        <Button onClick={addReview} sx={{ml:"10px" ,bgcolor:"red" ,color:"white"}} variant='contained'>Submit</Button>
                    </div>
                    </Grid>

                 
                    <div>
                    <h5 style={{color:"#147ADF"}}>Review</h5>
                    {reviewData.map((each)=>{
                        return <>
                        <div style={{display:"flex"}}>
                        <img key={auth.currentUser} style={{width:"20px", borderRadius:"50%"}} src={each.profile_image} alt="" />
                        <li style={{color:"grey",paddingLeft:"10px"}}>{each.username}</li>
                        </div>                       
                        <h5 style={{color:"white"}}>{each.movieReview}</h5>
                        </>
                    })}
                    </div>
                  
                </div>
            </Grid>

        </Grid>
        </div>
    )
}

export default MovieDetail
