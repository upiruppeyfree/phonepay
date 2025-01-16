import React, { useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';

function UpiId() {
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);

  const handelSubmit = (e) => {
    e.preventDefault();
    const UserData = { upiId };

    // Start the loading bar
    loadingBarRef.current.continuousStart();

    axios.post(`${import.meta.env.VITE_BASEURL}/user/upiId`, UserData, {
      withCredentials: true,
    })
      .then((res) => {
        toast.success(res.data.message || "UPI ID Added");
        navigate("/otp");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "Error");
      })
      .finally(() => {
        // Complete the loading bar after the request finishes
        loadingBarRef.current.complete();
      });
  };

  return (
    <>
      <LoadingBar color="#C1A0D2" height={"3px"} ref={loadingBarRef} />

      <form action="" className='me-2' onSubmit={handelSubmit}>
        <div className="col-md-6 position-relative ms-2 mt-5">
      <h4> Enter UPI ID </h4>
          <div className="form-floating">
            <input
              type="tel"
              id="upiId"
              className="form-control custom-outline"
              placeholder="Enter your UPI ID"
              onChange={(e) => setUpiId(e.target.value)}
            />
            <label htmlFor="upiId">Enter your UPI ID</label>
          </div>
        </div>
        <div className="col-12 position-absolute bottom-0 m-auto w-100">
          <button className="btn w-100" style={{ backgroundColor: "#5F259E", color: "white", borderRadius: "0px" }} type="submit">Continue</button>
        </div>
      </form>

    </>
  );
}

export default UpiId;
