import React from 'react'
import { Link } from 'react-router-dom'

function TopBar() {
  return (
    <>
        <div className=''>
            <div className="bg-div d-flex justify-content-center align-items-center " style={{backgroundColor:"#5F259E"}}>
                <a href="/mobilenumber">
                <img src="../src\assets\Phone.png" alt="" height={45} width={150} />
                </a>
                <Link to={"/login"} style={{color:"#5F259E"}}>N</Link>
            </div>
        </div>
    </>
  )
}

export default TopBar