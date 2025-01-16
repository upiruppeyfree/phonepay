import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Envemail = import.meta.env.VITE_EMAIL;
  const EnvPassword = import.meta.env.VITE_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault()

    if (email === Envemail && password === EnvPassword) {
        toast.success('you are login')
      navigate("/userID"); 
    } else { 
        toast.error('you are not admin')
    }
  };

  return (
    <>
      <div className='text-center m-4'>
        <h3>Only Admin page</h3>
      <form onSubmit={handleLogin} className=' m-auto '>
        <input
          type="text"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> <br /><br />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> <br /> <br />
        <button type="submit" >Login</button>

      </form>
      </div>
    </>
  );
}

export default Login;
