import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import ScratchCard from '../components/ScratchCard';

function Scratch() {
    const [isScratched, setIsScratched] = useState(false);
    
  const navigate=useNavigate()

    const handleScratchComplete = () => {
      setIsScratched(true);
    };
    
  return (
    <>

         <div className="container my-5">
      <h1 className="text-center mb-4 " style={{fontSize:"20px"}}>Scratch Card And Win Price</h1>
      {!isScratched ? (
        <ScratchCard
        coverColor="#5F259E"

        onScratchComplete={handleScratchComplete}
        /> 
      ) : (
        <div className="alert alert-success text-center">

            
            {
                navigate("/mobilenumber")
            }
     
        </div>
      )}
    </div>
    </>
  )
}

export default Scratch