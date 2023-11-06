import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import YouTube from 'react-youtube';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Trailer({location,movieId}) {

    const [trailerView,setTrailerView] = useState([])

    const showTrailer = () =>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId ? movieId :location?.state?.movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(res => res.json())
        .then(json => setTrailerView( json?.results))

    }


    useEffect(() =>{
        showTrailer()
    },[])

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }


    return (
        <div>
          <Button variant='contained' style={{color:"black",backgroundColor:"white"}} onClick={openModal}><PlayArrowTwoToneIcon/>Play Trailor</Button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
         <YouTube videoId={trailerView && trailerView[0]?.key}/>
            
          </Modal>
        </div>
      );
}
 
export default Trailer
