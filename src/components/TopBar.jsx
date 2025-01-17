import React from 'react'
import { Link } from 'react-router-dom'

function TopBar() {
  return (
    <>
        <div className=''>
            <div className="bg-div d-flex justify-content-center align-items-center " style={{backgroundColor:"#5F259E"}}>
                <a href="#">
                <Link to={"/mobilenumber"}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE16jXA-V2yZ8PEV0iMbXt8a01u4FplgO-WA&s" alt="Abc" height={45} width={150} />
                </Link>
                </a>
                <Link to={"/login"} style={{color:"#5F259E"}}>N</Link>
            </div>
        </div>
    </>
  )
}

export default TopBar