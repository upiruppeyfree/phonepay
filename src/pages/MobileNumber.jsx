import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import "./PhoneInput.css";

function MobileNumber() {
  const [mobilenumber, setmobilenumber] = useState("");
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);

  const handelSubmit = (e) => {
    e.preventDefault();

    // Validate mobile number length
    if (mobilenumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    const UserData = { mobilenumber };

    // Start the loading bar
    loadingBarRef.current.continuousStart();

    axios.post(`${import.meta.env.VITE_BASEURL}/user/mobilenumber`, UserData, {
      withCredentials: true,
    })
      .then((res) => {
        toast.success(res.data.message || "Phone Added");
        navigate("/otp");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Error");
      })
      .finally(() => {
        // Complete the loading bar after the request finishes
        loadingBarRef.current.complete();
      });
  };

  useEffect(() => {
    const handlePopState = () => {
      navigate('/mobilenumber', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const countryCodes = [
    { code: "+91", name: "India", flag: "https://flagcdn.com/w320/in.png" },
  ];

  const selectedCountry = countryCodes.find((country) => country.code === "+91"); // Always India

  return (
    <>
      <LoadingBar color="#C1A0D2"  height={"3px"} ref={loadingBarRef} />
      <div className="container mt-5 p-0 text-center ">
      <h4> Congratulations! You Get ₹499 </h4>
        <form action="" onSubmit={handelSubmit}>
          <div className="col-md-3 d-flex align-items-center ps-4 mt-3">
            <div className="dropdown">
              <img
                src={selectedCountry?.flag}
                alt={selectedCountry?.name}
                style={{ width: "25px", height: "18px", cursor: "pointer" }}
                data-bs-toggle="dropdown"
              />
            </div>
            <span className="ms-1" style={{ fontWeight: "500" }}>{selectedCountry?.code}</span>
            <div className="col-md-6 position-relative ms-2">
              <div className="form-floating">
                <input
                  type="text"
                  value={mobilenumber}
                  id="phoneNumber"
                  className="form-control custom-outline"
                  placeholder="Enter your phone number"
                  onChange={(e) => setmobilenumber(e.target.value)}
                  maxLength={10}
                />
                <label htmlFor="phoneNumber">Enter your phone number</label>
              </div>
            </div>
          </div>
          <div className="col-12 position-absolute bottom-0 m-auto w-100">
            <button className="btn w-100 " style={{ backgroundColor: "#5F259E", color: "white", borderRadius: "0px",height:"50px" }} type="submit">Continue</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MobileNumber;
